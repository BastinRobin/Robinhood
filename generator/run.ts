const path = require('path');
const fs = require('fs');
// const readline = require('readline');
const inquirer = require('inquirer');
const yaml = require('yamljs');

/**
 * Application Scaffolding Generator
 *
 * Usage:
 *  - node generator -n ServiceName
 *  - Name: ServiceName ~**
 *  - Enter root path *(/v1/): /v1/api/serviceName
 *  - Select DB:
 *      1. SQL
 *      2. NoSQL
 */

const property = {};
const model = {};
let service, route, relationName, relationModel, schemaText;

const servicePrompt = [
  {
    type: 'input',
    name: 'service',
    message: 'Enter service name',
  },
];

const propertyPrompt = [
  {
    type: 'input',
    name: 'property',
    message: 'Enter the property name',
  },
];

const relationPrompt = [
  {
    type: 'input',
    name: 'relation',
    message: 'Enter the relation name',
  },
];

const routePrompt = [
  {
    type: 'input',
    name: 'route',
    message: 'Enter route path without prefix (/v1)',
  },
];

const dataTypePrompt = {
  type: 'list',
  name: 'dataType',
  message: 'Select data type required',
  choices: [
    'String',
    'Integer',
    'Boolean',
    'Double',
    'Arrays',
    'Timestamp',
    'Object',
    'Date',
    'Object ID',
  ],
};

const relationModelPrompt = {
  type: 'list',
  name: 'model',
  message: 'Select the model to link relation with this model',
  choices: yaml.load('./server/common/models.yml'),
};

const loopPrompt = {
  type: 'confirm',
  name: 'loop',
  message: 'Do you want to add more property (Hit enter for YES)?',
  default: true,
};

const requiredPrompt = {
  type: 'confirm',
  name: 'required',
  message: 'Required field (Hit enter for YES)?',
  default: true,
};

const capitalizeFirstLetter = (string) => {
  return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
};

const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');
};

const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join('');
};

function askRouteConfirmation(name) {
  const question = {
    type: 'confirm',
    name: 'route',
    message: `API route "/v1/${convertToSlug(name)}" (Hit enter for YES)?: `,
    default: true,
  };

  inquirer.prompt(question).then((answer) => {
    if (answer.route) {
      route = convertToSlug(name);
      askModelFieldName();
    } else {
      askRouteName();
    }
  });
}

function askRelationConfirmation() {
  const question = {
    type: 'confirm',
    name: 'relation',
    message: `Do you want to add relation (Hit enter for NO)?: `,
    default: false,
  };

  inquirer.prompt(question).then((answer) => {
    if (answer.relation) {
      askRelationName();
    } else {
      generate_controller_dir(service);
      create_project(convertToSlug(service), `/v1/${convertToSlug(service)}`);
      createSchema();
    }
  });
}

function askRelationName() {
  inquirer.prompt(relationPrompt).then((answer) => {
    if (answer.relation) {
      relationName = capitalizeFirstLetter(titleCase(answer.relation));
      askRelationModelName(relationName);
    } else {
      askRelationName();
    }
  });
}

function askRelationModelName(relationName) {
  inquirer.prompt(relationModelPrompt).then((answer) => {
    if (answer.model) {
      relationModel = answer.model;
      // Append relation details to existing property object
      property[relationName] = {
        ref: relationModel,
        type: 'mongoose.Schema.Types.ObjectId',
      };
      generate_controller_dir(service);
      create_project(convertToSlug(service), `/v1/${convertToSlug(service)}`);
      createSchema();
    } else {
      askRelationModelName(relationName);
    }
  });
}

function askRouteName() {
  inquirer.prompt(routePrompt).then((answer) => {
    if (answer.route) {
      route = convertToSlug(answer.route);
      askModelFieldName();
    } else {
      askRouteName();
    }
  });
}

function askServiceName() {
  inquirer.prompt(servicePrompt).then((answer) => {
    if (answer.service) {
      service = titleCase(answer.service);
      askRouteConfirmation(answer.service);
    }
  });
}

function askModelFieldName() {
  inquirer.prompt(propertyPrompt).then((answer) => {
    if (answer.property) {
      askModelFieldType(convertToSlug(answer.property));
    } else {
      askModelFieldName();
    }
  });
}

function askModelFieldType(key) {
  inquirer.prompt(dataTypePrompt).then((answer) => {
    if (answer.dataType) {
      property[key] = { type: answer.dataType, require: '' };
      askRequired(key, answer.dataType);
    }
  });
}

function repeatConfirmation() {
  inquirer.prompt(loopPrompt).then((answer) => {
    if (answer.loop) {
      askModelFieldName();
    } else {
      askRelationConfirmation();
      // generate_controller_dir(service);
      // create_project(convertToSlug(service), `/v1/${convertToSlug(service)}`);
      // createSchema();
    }
  });
}

function askRequired(key, value) {
  inquirer.prompt(requiredPrompt).then((answer) => {
    property[key] = { type: value, require: answer.required };
    model[key] = value.toLowerCase();
    repeatConfirmation();
  });
}

function createSchema() {
  // let obj = yaml.load(fs.readFileSync('test.yaml', { encoding: 'utf-8' }));

  schemaText = `import mongoose, { Schema, Document } from 'mongoose';

  export interface I${service} extends Document ${JSON.stringify(
    model,
    null,
    4
  )}

  const ${service}Schema: Schema = new Schema(
    ${JSON.stringify(property, null, 4)}
  );
  
  export default mongoose.model<I${service}>('${service}', ${service}Schema);`;
  const dir = `./server/api/models/${service.toLowerCase()}.ts`;
  fs.writeFileSync(`${dir}`, schemaText); // Generate mongoose model and schema
  fs.appendFileSync('./server/common/models.yml', `\n- ${service}`); // Add model name to model.yml file to manage relationship
  console.log(`Generated ${service} Model in ${dir}`);
}

const generate_controller_dir = (name) => {
  const dir = `./server/api/controllers/${name.toLowerCase()}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    // console.log(`Service generated at ${dir}`);
  } else {
    console.log(`Service ${dir} already exists!!`);
  }
};

const rename_controller = async (name) => {
  const dir = `./server/api/controllers/${name.toLowerCase()}/controller.ts`;
  if (fs.existsSync(dir)) {
    const controllerName = `${titleCase(name)}Service`;
    const controllerPath = `${name.toLowerCase()}.service`;
    fs.readFile(dir, 'utf8', (_err, data) => {
      const formatted = data
        .replace(/ExamplesService/g, controllerName)
        .replace(/examples.service/g, controllerPath);
      fs.writeFile(dir, formatted, 'utf8', (err) => {
        if (err) return err;
      });
    });
  }
};

const replace_service = async (name) => {
  const dir = `./server/api/services/${name.toLowerCase()}.service.ts`;
  if (fs.existsSync(dir)) {
    const serviceName = service;
    fs.readFile(dir, 'utf8', (_err, data) => {
      const formatted = data
        .replace(/Example/g, serviceName)
        .replace(/example/g, serviceName.toLowerCase())
        .replace(/examples/g, serviceName.toLowerCase() + 's');
      fs.writeFile(dir, formatted, 'utf8', (err) => {
        if (err) return err;
      });
    });
  }
};

const replace_testcase = async (name, route_url) => {
  const dir = `./test/${name.toLowerCase()}.controller.ts`;
  if (fs.existsSync(dir)) {
    const serviceName = `${titleCase(name)}`;
    fs.readFile(dir, 'utf8', (_err, data) => {
      const formatted = data
        .replace(/Examples/g, serviceName)
        .replace('/example/g', name)
        .replace(/\/v1\/users/g, route_url);
      fs.writeFile(dir, formatted, 'utf8', (err) => {
        if (err) return err;
      });
    });
  }
};

/**
 * Generate controller file
 *
 * @param   {[type]}  name  [name description]
 *
 * @return  {[type]}        [return description]
 */
const generate_controller = async (name) => {
  const dir = `./server/api/controllers/${name.toLowerCase()}`;
  fs.copyFile(
    './generator/src/controller.ts',
    path.join(dir, 'controller.ts'),
    function (err) {
      if (err) throw err;
    }
  );
  // rename_controller(name);
  console.log(
    `Generated ${name.toLowerCase()} Controller in ${path.join(
      dir,
      'controller.ts'
    )}`
  );
};

const generate_router = async (name) => {
  const dir = `./server/api/controllers/${name.toLowerCase()}`;
  fs.copyFile(
    './generator/src/router.ts',
    path.join(dir, 'router.ts'),
    (err) => {
      if (err) throw err;
    }
  );

  console.log(
    `Generated ${name.toLowerCase()} Router in ${path.join(dir, 'router.ts')}`
  );
};

const generate_service = async (name) => {
  const dir = `./server/api/services/${name.toLowerCase()}.service.ts`;
  fs.copyFile('./generator/src/service.ts', dir, (err) => {
    if (err) throw err;
  });
  console.log(`Generated ${name.toLowerCase()} Service in ${dir}`);
};

const generate_test = async (name) => {
  const test_file = `./test/${name.toLowerCase()}.controller.ts`;
  fs.copyFile('./generator/src/test.ts', test_file, (err) => {
    if (err) throw err;
    replace_testcase(name, `/v1/${name.toLowerCase()}`);
  });
  console.log(`Generated ${name.toLowerCase()} Unit Test in ${test_file}`);
};

// const modify_main = async (name) => {
//   const dir = `./server/routes.ts`;
//   const serviceName = `${capitalizeFirstLetter(name)}`;
//   if (fs.existsSync(dir)) {
//     fs.readFile(dir, 'utf8', (_err, data) => {
//       const formatted = data
//         .replace(/Examples/g, serviceName)
//         .replace('/example/g', name);
//       fs.writeFile(dir, formatted, 'utf8', (err) => {
//         if (err) return err;
//         console.log(`Generated Test..........!!!`);
//       });
//     });
//   }
// };

const create_project = async (name, route_url) => {
  await generate_controller(name);
  await generate_router(name);
  await generate_service(name);
  await generate_test(name);
  setTimeout(async () => {
    await rename_controller(name);
    await replace_service(name);
  }, 500);
  await replace_testcase(name, route_url);
};

askServiceName();
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question('Enter Service name: ', (name) => {
//   generate_service(name);
//   rl.question(
//     `API route "/v1/${name.toLowerCase()}" Y or N ?: `,
//     async (_path) => {
//       rl.question(`1.) HTTPS or 2.) WS: `, async (_layer) => {
//         if (_path == 'Y' || _path == 'y') {
//           await create_project(name, `/v1/${name.toLowerCase()}`);
//           setTimeout(() => {
//             rl.close();
//           }, 5000);
//         } else if (_path == 'N' || _path == 'n') {
//           rl.question(`Enter route path`, async (_new_path) => {
//             await create_project(name, _new_path);
//             setTimeout(() => {
//               rl.close();
//             }, 5000);
//           });
//         }
//         setTimeout(() => {
//           rl.close();
//         }, 5000);
//       });
//     }
//   );
// });

// rl.on('close', () => {
//   console.log('Scaffolding generated successfully !!!');
//   process.exit(0);
// });
