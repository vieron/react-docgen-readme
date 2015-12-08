'use strict';

var fs = require('fs');
var path = require('path');
var compileTemplate = require('lodash.template');
var merge = require('lodash.merge');
var forEach = require('lodash.foreach');
var mdu = require('markdown-utils');


function docToMarkdown(doc, tplPath, srcPath) {
    var tplContents = fs.readFileSync(tplPath);
    if (!tplContents) { return ''; }

    var data = merge({}, mdu, {
        _: { forEach: forEach }
    });

    var template = compileTemplate(tplContents.toString(), {
        imports: data,
        variable: 'c'
    });

    return template(doc);
}

function isDocEmpty(docMd) {
    return docMd.join('').replace(/\n/g, '').trim().length === 0;
}

function fileToMarkdown(file, tplPath) {
    if (!file) { return; }
    var docHeader = mdu.link(path.basename(file.path), file.path) + '\n';
    var docMd = file.docs.map(function(d) {
        return docToMarkdown(d, tplPath, file.path);
    });

    if (isDocEmpty(docMd)) { return ''; }

    return (docHeader + docMd.join('\n'));
};

module.exports.docToMarkdown = docToMarkdown;
module.exports.fileToMarkdown = fileToMarkdown;
