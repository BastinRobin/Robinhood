const path = require('path');
const fs = require('fs');
const readline = require('readline');

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

const capitalizeFirstLetter = (string) => {
  return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
};

const generate_service = (name) => {
  const dir = `./server/api/controllers/${name.toLowerCase()}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    // console.log(`Service generated at ${dir}`);
  } else {
    console.log(`Service ${dir} already exists!!`);
  }
};

const rename_controller = (name) => {
  const dir = `./server/api/controllers/${name.toLowerCase()}/controller.ts`;
  if (fs.existsSync(dir)) {
    const controllerName = `${capitalizeFirstLetter(name)}Service`;
    const controllerPath = `${name.toLowerCase()}.service`;
    fs.readFile(dir, 'utf8', (_err, data) => {
      const formatted = data
        .replace(/ExamplesService/g, controllerName)
        .replace(/examples.service/g, controllerPath);
      fs.writeFile(dir, formatted, 'utf8', (err) => {
        if (err) return err;
        console.log(`Generated Controller........!!!`);
      });
    });
  }
};

const replace_model = (name) => {
  const dir = `./server/api/services/${name.toLowerCase()}.service.ts`;
  if (fs.existsSync(dir)) {
    const serviceName = `${capitalizeFirstLetter(name)}`;
    fs.readFile(dir, 'utf8', (_err, data) => {
      const formatted = data.replace(/Example/g, serviceName);
      fs.writeFile(dir, formatted, 'utf8', (err) => {
        if (err) return err;
        console.log(`Generated Models..........!!!`);
      });
    });
  }
};

const replace_testcase = (name, route_url) => {
  const dir = `./test/${name.toLowerCase()}.controller.ts`;
  if (fs.existsSync(dir)) {
    const serviceName = `${capitalizeFirstLetter(name)}`;
    fs.readFile(dir, 'utf8', (_err, data) => {
      const formatted = data
        .replace(/Examples/g, serviceName)
        .replace('/example/g', name)
        .replace(/\/v1\/users/g, route_url);
      fs.writeFile(dir, formatted, 'utf8', (err) => {
        if (err) return err;
        console.log(`Generated Test..........!!!`);
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
const generate_controller = (name) => {
  const dir = `./server/api/controllers/${name.toLowerCase()}`;
  fs.copyFile(
    './generator/src/controller.ts',
    path.join(dir, 'controller.ts'),
    function (err) {
      if (err) throw err;
    }
  );
  // rename_controller(name);
  console.log(`Generated ${name.toLowerCase()} controller`);
  console.log(path.join(dir, 'controller.ts'));
};

const generate_router = (name) => {
  const dir = `./server/api/controllers/${name.toLowerCase()}`;
  fs.copyFile(
    './generator/src/router.ts',
    path.join(dir, 'router.ts'),
    (err) => {
      if (err) throw err;
    }
  );

  console.log(`Generated ${name.toLowerCase()} router`);
  console.log(path.join(dir, 'router.ts'));
};

const generate_model = (name) => {
  const dir = `./server/api/services/${name.toLowerCase()}.service.ts`;
  fs.copyFile('./generator/src/service.ts', dir, (err) => {
    if (err) throw err;
  });
  console.log(`Generated ${name.toLowerCase()} model`);
  console.log(dir);
};

const generate_test = (name) => {
  const test_file = `./test/${name.toLowerCase()}.controller.ts`;
  fs.copyFile('./generator/src/test.ts', test_file, (err) => {
    if (err) throw err;
    replace_testcase(name, `/v1/${name.toLowerCase()}`);
  });
  console.log(`Generated ${name.toLowerCase()} testcases`);
  console.log(test_file);
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
  await rename_controller(name);
  await generate_router(name);
  await generate_model(name);
  await replace_model(name);
  await generate_test(name);
  await replace_testcase(name, route_url);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter Service name: ', (name) => {
  generate_service(name);
  rl.question(
    `API route "/v1/${name.toLowerCase()}" Y or N ?: `,
    async (_path) => {
      rl.question(`1.) HTTPS or 2.) WS: `, async (_layer) => {
        if (_path == 'Y' || _path == 'y') {
          await create_project(name, `/v1/${name.toLowerCase()}`);
          setTimeout(() => {
            rl.close();
          }, 5000);
        } else if (_path == 'N' || _path == 'n') {
          rl.question(`Enter route path`, async (_new_path) => {
            await create_project(name, _new_path);
            setTimeout(() => {
              rl.close();
            }, 5000);
          });
        }
        setTimeout(() => {
          rl.close();
        }, 5000);
      });
    }
  );
});

rl.on('close', () => {
  console.log('Scaffolding generated successfully !!!');
  process.exit(0);
});
