#!/usr/bin/env node
var program = require('yargs');
var docGen = require('../src/generator.js');

var argv = require('yargs').demand(1);

Object.keys(docGen.defaults).forEach(function(optKey) {
    var optDefault = docGen.defaults[optKey];
    argv = argv.option(optKey, {
        default: optDefault
    });
});

argv = argv.argv

docGen.generator(argv._[0], argv);
