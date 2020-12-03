const fs = require('fs');
const path = require('path');
const readline = require('readline');


const replace_test = (name) => {
  const dir = `./server/routes.ts`;
  if (fs.existsSync(dir)) {
    fs.readFile(dir, 'utf8', (_err, data) => {
      console.log()
    });
  }
};
