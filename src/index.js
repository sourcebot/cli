'use strict';


const Structure = require('./structure');

const request = require('request-promise');
const Promise = require('bluebird');
const app = require('commander');
const VERSION = require('../package.json').version;

process.title = 'sourcebot';

app
  .version(VERSION);

  request({
    url: 'http://registry.npmjs.org/sourcebot',
    json: true
  })
  .then((registry) => {
    console.log('reg', registry['dist-tags'].latest)
  })

app
  .command('create [path]')
  .alias('c')
  .description('Create a boilerplate with a given path')
  .option('-n, --name', 'Path to create folder on')
  .action((name, options) => {
    const sourcebot = new Structure(name);

    request({
      url: 'http://registry.npmjs.org/sourcebot',
      json: true
    })
    .then((registry) => {
      const sourcebotVersion = registry['dist-tags'].latest;

      return sourcebot
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
              sourcebot: `^${sourcebotVersion}`
            }
          };

          return Promise
            .all([
              sourcebot.createFile('package.json', JSON.stringify(packageJson, null, 2)),
              sourcebot.createFile('index.js', require('./templates')),
              sourcebot.createFile('.gitignore', 'node_modules/')
            ]);
        })
    })
    .catch(err => console.error(`Sourcebot: ${err.message}`))
  });

app.parse(process.argv);
