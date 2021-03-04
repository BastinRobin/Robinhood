const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const yaml = require('yamljs');
const slugGenerator = require('slug-generator');
const camelCase = require('camelcase');

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
const generatorDir = './generator/src/';
const apiDir = './server/api/';
const swagger = yaml.load('./server/common/api.yml');
const models = [];
let service,
  route,
  relationName,
  relationModel,
  schemaText,
  secureAPI,
  serviceDir;

for (const tags of swagger.tags) {
  models.push(tags.name);
}
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
    'Number',
    'Integer',
    'Boolean',
    'Double',
    'Arrays',
    'Timestamp',
    'Object',
    'Date',
    'ObjectId',
    'Mixed',
    'Decimal128',
  ],
};

const relationModelPrompt = {
  type: 'list',
  name: 'model',
  message: 'Select the model to link relation with this model',
  choices: models,
};

const loopPrompt = {
  type: 'confirm',
  name: 'loop',
  message: 'Do you want to add more property (Hit enter for YES)?',
  default: true,
};

const securityPrompt = {
  type: 'confirm',
  name: 'security',
  message: 'Do you want to secure the API using API token (Hit enter for YES)?',
  default: true,
};

const requiredPrompt = {
  type: 'confirm',
  name: 'required',
  message: 'Required field (Hit enter for YES)?',
  default: true,
};

const askRouteConfirmation = (name) => {
  const question = {
    type: 'confirm',
    name: 'route',
    message: `API route "/v1/${slugGenerator(
      name,
      '_'
    )}" (Hit enter for YES)?: `,
    default: true,
  };

  inquirer.prompt(question).then((answer) => {
    if (answer.route) {
      route = slugGenerator(name, '_');
      askAPISecurityConfirmation();
    } else {
      askRouteName();
    }
  });
};

const askAPISecurityConfirmation = () => {
  inquirer.prompt(securityPrompt).then((answer) => {
    if (answer.security) {
      secureAPI = true;
    } else {
      secureAPI = false;
    }
    askModelFieldName();
  });
};

const askRelationConfirmation = (more = false) => {
  const question = {
    type: 'confirm',
    name: 'relation',
    message: `Do you want to add ${
      more ? 'more' : ''
    } relation (Hit enter for NO)?: `,
    default: false,
  };

  inquirer.prompt(question).then((answer) => {
    if (answer.relation) {
      askRelationName();
    } else {
      generateServiceDir();
      createProject(service);
      createSchema();
      generateSwagger();
    }
  });
};

const askRelationName = () => {
  inquirer.prompt(relationPrompt).then((answer) => {
    if (answer.relation) {
      relationName = slugGenerator(answer.relation, '_');
      askRelationModelName(relationName);
    } else {
      askRelationName();
    }
  });
};

const askRelationModelName = (relationName) => {
  inquirer.prompt(relationModelPrompt).then((answer) => {
    if (answer.model) {
      relationModel = answer.model;
      // Append relation details to existing property object
      property[relationName] = {
        ref: relationModel,
        type: 'ObjectId',
      };
      askRelationConfirmation(true);
    } else {
      askRelationModelName(relationName);
    }
  });
};

const askRouteName = () => {
  inquirer.prompt(routePrompt).then((answer) => {
    if (answer.route) {
      route = slugGenerator(answer.route, '_');
      askModelFieldName();
    } else {
      askRouteName();
    }
  });
};

const askServiceName = () => {
  inquirer.prompt(servicePrompt).then((answer) => {
    if (answer.service) {
      serviceDir = `${apiDir}src/${slugGenerator(answer.service, '_')}`;
      service = camelCase(answer.service, { pascalCase: true });
      askRouteConfirmation(answer.service);
    }
  });
};

const askModelFieldName = () => {
  inquirer.prompt(propertyPrompt).then((answer) => {
    askModelFieldType(slugGenerator(answer.property, '_'));
    // if (answer.property) {
    //   askModelFieldType(convertToSlug(answer.property));
    // } else {
    //   askModelFieldName();
    // }
  });
};

const askModelFieldType = (key) => {
  if (key) {
    inquirer.prompt(dataTypePrompt).then((answer) => {
      if (answer.dataType) {
        property[key] = { type: answer.dataType, require: '' };
        askRequired(key, answer.dataType);
      }
    });
  } else {
    repeatConfirmation();
  }
};

const repeatConfirmation = () => {
  inquirer.prompt(loopPrompt).then((answer) => {
    if (answer.loop) {
      askModelFieldName();
    } else {
      askRelationConfirmation();
    }
  });
};

const generateSwagger = () => {
  const dKey = `${service}Body`;

  // Tags
  const stag = { name: '', description: '' };
  stag.name = service;
  stag.description = `${service} API`;
  swagger.tags.push(stag);

  // Definitions
  const required = [];
  const properties = {};
  for (const key in property) {
    if (property[key].require) {
      required.push(key);
    }
    if (property[key].type) {
      const type =
        property[key].type === 'ObjectId'
          ? 'string'
          : property[key].type.toLowerCase();
      const prop = { type: type };
      properties[key] = prop;
    }
  }
  swagger.definitions[dKey] = {
    type: 'object',
    title: service,
    required,
    properties,
  };

  // Route
  const security = secureAPI ? { ApiKeyAuth: [] } : '';
  swagger.paths[`/${route}`] = {
    get: {
      security: [security],
      tags: [service],
      summary: `Fetch all ${route}`,
      description: `Fetch all ${route}`,
      responses: { '200': { description: `Returns all ${route}` } },
    },
    post: {
      security: [security],
      tags: [service],
      description: `Create a new ${route}`,
      summary: `Create a new ${route}`,
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: `${service} object that needs to be added to the store`,
          required: true,
          schema: { $ref: `#/definitions/${service}Body` },
        },
      ],
      responses: { '200': { description: `Returns all ${route}` } },
    },
    delete: {
      security: [security],
      tags: [service],
      summary: `Delete all records`,
      responses: {
        '200': { description: `Delete the ${service} with all records` },
        '404': { description: `${service} not found` },
      },
    },
  };
  swagger.paths[`/${route}/{id}`] = {
    get: {
      security: [security],
      tags: [service],
      summary: `Fetch specific ${route} from id`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: `The id of the ${service} to retrieve`,
          type: 'string',
        },
      ],
      responses: {
        '201': { description: `Return the ${service} with the specified id` },
        '404': { description: `${service} not found` },
      },
    },
    put: {
      security: [security],
      tags: [service],
      summary: `Update existing ${route}`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'id that need to be updated',
          required: true,
          type: 'string',
        },
        {
          in: 'body',
          name: 'body',
          description: `Updated ${route} object`,
          required: true,
          schema: { $ref: `#/definitions/${service}Body` },
        },
      ],
      responses: { '200': { description: `Update ${route}` } },
    },
    delete: {
      security: [security],
      tags: [service],
      summary: `Delete specific ${route} from id`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: `The id of the ${service} to delete`,
          type: 'string',
        },
      ],
      responses: {
        '200': { description: `Delete the ${service} with the specified id` },
        '404': { description: `${service} not found` },
      },
    },
  };
  swagger.paths[`/${route}/count/all`] = {
    get: {
      security: [security],
      tags: [service],
      summary: `Get total row count of ${route}`,
      responses: {
        '201': { description: `Return the count of ${service}` },
        '404': { description: `${service} not found` },
      },
    },
  };
  const swaggerString = yaml.dump(swagger);
  fs.writeFileSync('./server/common/api.yml', swaggerString, 'utf8');
};

const askRequired = (key, value) => {
  inquirer.prompt(requiredPrompt).then((answer) => {
    property[key] = { type: value, require: answer.required };
    model[key] = value.toLowerCase();
    repeatConfirmation();
  });
};

const createSchema = () => {
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

  const dir = `${serviceDir}/model.ts`;

  fs.writeFileSync(`${dir}`, schemaText); // Generate mongoose model and schema
  console.log(`Generated micro service in ${serviceDir}`);
};

const generateServiceDir = () => {
  if (!fs.existsSync(serviceDir)) {
    fs.mkdirSync(serviceDir);
  } else {
    console.log(`Service ${serviceDir} already exists!!`);
  }
};

const renameController = async (name) => {
  const dir = `${serviceDir}/controller.ts`;
  if (fs.existsSync(dir)) {
    const controllerName = `${camelCase(name, { pascalCase: true })}Service`;
    const controllerPath = `${name}.service`;
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

const replaceService = async () => {
  const dir = `${serviceDir}/service.ts`;
  if (fs.existsSync(dir)) {
    fs.readFile(dir, 'utf8', (_err, data) => {
      const formatted = data
        .replace(/Example/g, service)
        .replace(/example/g, service.toLowerCase())
        .replace(/examples/g, service.toLowerCase() + 's');
      fs.writeFile(dir, formatted, 'utf8', (err) => {
        if (err) return err;
      });
    });
  }
};

const replaceTestCase = async (name) => {
  const dir = `./test/${route}.controller.ts`;
  if (fs.existsSync(dir)) {
    const serviceName = `${camelCase(name, { pascalCase: true })}`;
    fs.readFile(dir, 'utf8', (_err, data) => {
      const formatted = data
        .replace(/Examples/g, serviceName)
        .replace(/\/v1\/example/g, `/v1/${route}`)
        .replace(/example/g, name);
      fs.writeFile(dir, formatted, 'utf8', (err) => {
        if (err) return err;
      });
    });
  }
};

/**
 * Generate controller file
 *
 *
 * @return  {[type]}        [return description]
 */
const generateController = async () => {
  fs.copyFile(
    `${generatorDir}controller.ts`,
    path.join(serviceDir, 'controller.ts'),
    (err) => {
      if (err) throw err;
    }
  );
};

const generateRouter = async (name) => {
  // Router child file
  let routeText = `import express from 'express';\nimport controller from './controller';${
    secureAPI
      ? "\nimport tokenVerify from './../../middlewares/token.verify';"
      : ''
  }\nexport default express\n\t.Router()\n\t.get('/', ${
    secureAPI ? 'tokenVerify,' : ''
  } controller.index)\n\t.get('/:id', ${
    secureAPI ? 'tokenVerify,' : ''
  } controller.show)\n\t.post('/', ${
    secureAPI ? 'tokenVerify,' : ''
  } controller.store)\n\t.put('/:id', ${
    secureAPI ? 'tokenVerify,' : ''
  } controller.update)\n\t.delete('/:id', ${
    secureAPI ? 'tokenVerify,' : ''
  } controller.delete)\n\t.delete('/', ${
    secureAPI ? 'tokenVerify,' : ''
  } controller.deleteAll)\n\t.get('/count/all', ${
    secureAPI ? 'tokenVerify,' : ''
  } controller.count);\n`;
  routeText = routeText.replace(/ +(?= )/g, '');
  fs.writeFileSync(`${serviceDir}/router.ts`, routeText);

  // Router parent file
  let routes = fs.readFileSync(`${apiDir}../routes.ts`, 'utf8').split('export');
  const routesImport =
    routes[0] + `import ${name}Router from './api/src/${route}/router';\n`;
  let routesExport = routes[1].split('}');
  routesExport = `export${routesExport[0]}  app.use('/v1/${route}/', ${name}Router);\n}\n`;
  routes = routesImport + routesExport;
  fs.writeFileSync(`${apiDir}../routes.ts`, routes);
};

const generateService = async () => {
  const dir = `${serviceDir}/service.ts`;
  fs.copyFile(`${generatorDir}service.ts`, dir, (err) => {
    if (err) throw err;
  });
};

const generateTest = async (name) => {
  const testFile = `./test/${route}.controller.ts`;
  fs.copyFile(`${generatorDir}test.ts`, testFile, (err) => {
    if (err) throw err;
  });
  console.log(`Generated ${name.toLowerCase()} Unit Test in ${testFile}`);
};

const createProject = async (name) => {
  await generateController();
  await generateRouter(name);
  await generateService();
  await generateTest(name);
  setTimeout(async () => {
    await renameController(name);
    await replaceService();
    await replaceTestCase(name);
  }, 500);
};

askServiceName();
