#!/usr/bin/env node
"use strict";

const fs = require('fs/promises')
const path = require('path');
const sass = require('sass');

const appRoot = path.resolve(__dirname, '..');
const config = require(path.resolve(appRoot, 'config.json'));

const Handlebars = require('HandlebarsExtended')({
  appRoot         : appRoot,
  ...config.paths
});


// build html files with Handlebard
Handlebars.buildSite(config)

// build css files from SASS
const files = ['main', 'normalize'];
files.forEach( async file => {
  const infile = path.resolve(appRoot, 'src', 'sass', `${file}.scss`);
  const outfile = path.resolve(appRoot, 'docs', 'css', `${file}.css`);
  try {
    const result = sass.renderSync( { file: infile, outFile: outfile } );
    await fs.writeFile(outfile, result.css)
  }
  catch (e){
    console.log(`failed to compile ${infile} : ${e}`)
  }
})
  
