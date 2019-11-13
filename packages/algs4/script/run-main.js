'use strict';

/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

(async () => {
  const { entry } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entry',
      message: "Input main entry lib's name, for example: DoublingTest.",
    },
  ]);
  const filePath = path.resolve(__dirname, `../lib/${entry}/index.js`);
  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
  } catch (error) {
    console.error(error);
    console.log('Unknown lib name, please double check lib name.');
    process.exit(-1);
  }
  require(filePath).default.main();
})();
