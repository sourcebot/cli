'use strict';


const Structure = require('./structure');

const Promise = require('bluebird');
const app = require('commander');
const VERSION = require('../package.json').version;

process.title = 'sourcebot';

app
  .version(VERSION);

app
  .command('create [path]')
  .alias('c')
  .description('Create a boilerplate with a given path')
  .option('-n, --name', 'Path to create folder on')
  .action((name, options) => {
    const sourcebot = new Structure(name);

    sourcebot
      .createFolder()
      .then(() => {
        const packageJson = {
          name: name,
          version: '1.0.0',
          main: 'index.js',
          scripts: {
            test: 'echo \"Error: no test specified\" && exit 1'
          },
          dependencies: {
            sourcebot: '*'
          }
        };

        return Promise
          .all([
            sourcebot.createFile('package.json', JSON.stringify(packageJson, null, 2)),
            sourcebot.createFile('index.js', require('./templates')),
            sourcebot.createFile('.gitignore', 'node_modules/')
          ]);
      })
      .catch(err => console.error(`Sourcebot: ${err.message}`))
  });

app.parse(process.argv);
