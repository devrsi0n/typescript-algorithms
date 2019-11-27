'use strict';

/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
// const util = require('util');

const { exec } = require('shelljs');

(async () => {
  let entry = process.argv[2];
  if (!entry) {
    entry = await inquirer.prompt([
      {
        type: 'input',
        name: 'entry',
        message: `Input main entry lib's name, for example: DoublingTest.
          e.g. \`yarn run-main UF\`,
          file as input stream: \`yarn run-main UF '< ./src/UF/tinyUF.txt'\`
          for debug: \`yarn run-main UF < ./src/UF/tinyUF.txt -d\`, make sure toggle vscode auto-attach process configuration
          `,
      },
    ]).entry;
  }
  const filePath = path.resolve(__dirname, `../src/${entry}`);
  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
  } catch (error) {
    console.error(error);
    console.log(`Unknown lib name(${entry}), please double check lib's name.`);
    process.exit(-1);
  }
  const args = process.argv.slice(3);
  // const execCommand = `node -r ts-node/register --inspect-brk -e 'import mod from "${filePath}"; mod.main()' < ${fileName}`;
  let execCommand = `node -r ts-node/register -e 'require("${filePath}").default.main()' ${args.join(
    ' '
  )}`;
  if (process.argv.includes('-d')) {
    execCommand = `node -r ts-node/register --inspect-brk -e 'require("${filePath}").default.main()' ${args
      .filter((a) => a !== '-d')
      .join(' ')}`;
  }
  console.log(`debug execCommand: ${execCommand}\n`);
  try {
    exec(execCommand);
  } catch (error) {
    console.log({ error });
  }
})();
