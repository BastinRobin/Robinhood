const fs = require('fs');
const readline = require("readline");

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter service name: ', (name) => {
  rl.question('API route ?:', (path) => {
    console.log(name, path);
    rl.close();
  });
});

rl.on('close', () => {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});
