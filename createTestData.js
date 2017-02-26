#! /usr/bin/env node
const fs = require('fs');

const deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file){
      var curPath = path + '/' + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const leadExtension = process.argv[2] ? process.argv[2] : 'lead';
const followExtension = process.argv[3] ? process.argv[3] : 'follow';

deleteFolderRecursive('testData');
fs.mkdirSync('testData');

for(let i = 0; i < 100; i++) {
  fs.writeFile(`testData/lead_${i}.${leadExtension}`, '');
  fs.writeFile(`testData/follow_${i}.${followExtension}`, '');
}

console.log(process.env.PWD);