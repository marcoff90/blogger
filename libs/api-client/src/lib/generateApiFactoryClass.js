const fs = require('fs');

const [nodePath, thisFileName, ...generatedDirs] = process.argv;

console.log('>> Generate ApiFactory class');

const OUTPUT_FILE_NAME = './api/apiFactory.ts';

let content = [];

let generatedInfo = `/* eslint-disable */
/*
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! GENERATED FILE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * (autogenerated by generateApiFactoryClass.js)
 */\n
 `;

let generatedClass = `
\n/**
 * This class provides methods to create specific apis
 */
export default class ApiFactory {`;

generatedDirs.forEach((generatedDir) => {
  const dirName = generatedDir.substr(generatedDir.lastIndexOf('/') + 1);
  console.log('generatedDir', generatedDir);
  console.log('>> Creating factory methods for apis in dir ' + dirName);

  const data = fs.readFileSync(generatedDir + '/api.ts', 'utf8');

  let controllerNames = [];
  data.split(' ').map(word => {
    if (word.endsWith('ServiceApi')) {
      if (!controllerNames.includes(word)) {
        controllerNames.push(word);
      }
    }
  });

  let functions = '';
  let imports = '';
  controllerNames.forEach(name => {
    functions += `\n
    public static create${name}() {
      return new ${name}();
    }`;

    imports += `import {${name}} from './${dirName}';\n`;
  });

  content.push(generatedInfo);
  content.push(imports);
  content.push(generatedClass);
  content.push(functions);
  content.push(`\n}`);
});

fs.writeFileSync(generatedDirs[0] + '/../' + OUTPUT_FILE_NAME,
  content.join(''));