#! /usr/bin/env node
const path = require('path');
const fs = require('fs');

if (process.argv.length < 7 && !process.argv.includes('--help')) {
  throw new Error('Not enough arguments!');
}

if (process.argv.includes('--help')) {
  console.log(`
rename-by-ext - Rename files by their extension

The idea is to rename two lists of files by their extension. For an example movie files and their subtitles.
It's necessary for them to be in the same order.

Usage:

rename-by-extension PATH --lead LEAD_EXTENSION --follow FOLLOW_EXTENSION


`);
  process.exit();
}

const pathParameter = process.argv[2] ? process.argv[2] : '';
const absolutePath =
  pathParameter[0] === '/' ? pathParameter : path.normalize(process.env.PWD + '/' + pathParameter);

const leadIndex = process.argv.indexOf('--lead') + 1;
const leadExtension = process.argv[leadIndex];

const followIndex = process.argv.indexOf('--follow') + 1;
const followExtension = process.argv[followIndex];

const filenames = fs.readdirSync(absolutePath);

const leads = filenames.filter(name => !name.startsWith('.') && name.endsWith(`.${leadExtension}`));
const follows = filenames.filter(
  name => !name.startsWith('.') && name.endsWith(`.${followExtension}`)
);

if (leads.length == follows.length) {
  for (let i = 0; i < leads.length; i++) {
    let leadName = leads[i].split(`.${leadExtension}`)[0];
    let follower = follows[i];
    fs.rename(
      `${absolutePath}/${follower}`,
      `${absolutePath}/${leadName}.${followExtension}`,
      () => undefined
    );
  }
}
