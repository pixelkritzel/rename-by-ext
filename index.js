#! /usr/bin/env node
console.log('Starting ...');
const path = require('path');
const fs = require('fs');

const pathParameter = process.argv[2] ? process.argv[2] : '';
const absolutePath = pathParameter[0] === '/' ? pathParameter : path.normalize(process.env.PWD + '/' + pathParameter );

const filenames = fs.readdirSync(absolutePath);

const movies = filenames.filter(name => !name.startsWith('.') && name.endsWith('.mp4'));
const subs = filenames.filter(name => !name.startsWith('.') && name.endsWith('.srt'));

if (movies.length == subs.length) {
  for(let i = 0; i < movies.length; i++) {
    let movieName = movies[i].split('.mp4')[0];
    let subtitle = subs[i];
    fs.rename(`${absolutePath}/${subtitle}`, `${absolutePath}/${movieName}.srt`);
  }
}