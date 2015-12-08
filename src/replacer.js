'use strict';

var fs = require('fs');
var endDelSuffix = ':end';


function addDelimiters(str, delimiter) {
    debugger;
    return (delimiterTag(delimiter) + '\n' +
            str +
            delimiterTag(delimiter + endDelSuffix));
};

function delimiterTag(delimiter) {
    return '<!-- ' + delimiter + ' -->';
}

function delimiterRegex(delimiter) {
    return new RegExp(
        ['<!--\\s*', delimiter, '\\s*-->'].join(''), 'gi');
}

function endDelimiterRegex(delimiter) {
    return delimiterRegex(delimiter + endDelSuffix);
}

function replaceFile(filePath, docs, opts) {
    var fileContents = fs.readFileSync(filePath).toString();
    var newContents = replaceContents(fileContents, docs, opts);
    if (! newContents) {
        console.log('No file updated!', filePath);
        return;
    }

    fs.writeFileSync(filePath, newContents);
    console.log('The file `%s` has been successfully updated with the docs!', filePath);
    return newContents;
}

function replaceContents(str, docs, opts) {
    var startDel = delimiterRegex(opts.delimiter);
    var endDel = endDelimiterRegex(opts.delimiter);

    var hasStartDel = str.match(startDel);
    var hasEndDel = str.match(endDel);

    if (!hasStartDel && !hasEndDel) {
        console.warn([
            'No indicator found in file.',
            'You need to add `%s` to let the me know where to append the docs.'
        ].join(''), delimiterTag(opts.delimiter));
        return;
    }

    docs = addDelimiters(docs, opts.delimiter);

    if (hasEndDel) {
        return str.replace(
            new RegExp(startDel.source + ('(.|\\n)+') + endDel.source), docs);
    }

    if (hasStartDel) {
        return str.replace(startDel, docs);
    }
}


module.exports.replaceContents = replaceContents;
module.exports.replaceFile = replaceFile;