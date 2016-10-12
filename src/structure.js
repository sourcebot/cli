'use strict';


const Promise = require('bluebird');

const fs = require('fs');
const path = require('path');

class Structure {
  /**
   * @constructor
   */
  constructor(name) {
    this.folder = name || 'sourcebot-example';
  }


  /**
   * Create a folder in a given path.
   */
  createFolder() {
    const folder = path.join(this.folder);

    return new Promise((resolve, reject) => {
      fs.mkdir(folder, (err) => {
        if (err) {
          return reject(err.code == 'EEXIST' ?
            new Error('Folder already exists. Please use a different path.')
            : err
          );
        }

        console.log('SourceBot - Folder created.');

        resolve();
      });
    });
  }


  /**
   * Create a file in the existing folder.
   *
   * @param {String} name - File name.
   * @param {String} data - File data that should be written.
   */
  createFile(name, data) {
    const file = path.join(this.folder, name);

    return new Promise((resolve, reject) => {
      fs.writeFile(file, data, (err) => {
        if (err) return reject(err);

        resolve();
      });
    });
  }
}


module.exports = Structure;
