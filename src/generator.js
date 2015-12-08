'use strict';

var path = require('path');
var reactDocs = require('react-docgen');
var dir = require('node-dir');
var compact = require('lodash.compact');
var merge = require('lodash.merge');

var markdowm = require('./markdown.js');
var replacer = require('./replacer.js');


var defaults = {
    ext: ['js', 'jsx'],
    ignoreDir: ['node_modules', 'bower_components'],
    template: path.join(__dirname, './template.md'),
    readmeFile: './README.md',
    delimiter: 'react-components-docs'
}

function generator(path, opts, done) {
    opts = merge({}, defaults, opts);

    readFiles(path, opts, function(files) {
        var markdown = generateMarkdown(files, opts.template);
        replacer.replaceFile(opts.readmeFile, markdown, opts);
        typeof done === 'function' && done(markdown);
    });
}

function extensionMatcher(ext) {
    return new RegExp('\\.(?:' + ext.join('|') + ')$');
}

function readFiles(path, opts, done) {
    opts || (opts = {});
    var files = [];

    dir.readFiles(path, {
            match: extensionMatcher(opts.ext),
            excludeDir: opts.ignoreDir
        },
        function(error, content, filename, next) {
            if (error) { process.exit(1); }
            files.push({
                path: filename,
                docs: extractDocs(filename, content)
            });
            next();
        },
        function(error) {
            if (error) { process.exit(1); }
            done(files);
        });
}

function extractDocs(filename, filecontent) {
    var resolver = reactDocs.resolver.findAllComponentDefinitions;
    try {
        var parsed = reactDocs.parse(filecontent, resolver);
        return parsed instanceof Array ? parsed : [parsed];
    } catch(e) {
        console.log('Not able to parse any docs in: %s', filename);
        return [];
    }
}

function generateMarkdown(files, tplPath) {
    var docs = files.map(function(f) {
        return markdowm.fileToMarkdown(f, tplPath);
    });
    return compact(docs).join('\n\n');
}

module.exports.generator = generator;
module.exports.defaults = defaults;
