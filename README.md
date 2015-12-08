# react-docgen-readme

CLI tool that extracts information from React Components using [react-docgen](https://github.com/reactjs/react-docgen), transforms that information into Markdown and adds it to your README file.


## Install

    $ npm install --save-dev react-docgen-readme


## Usage

    $ rdr <componentsDir> [options]
    // `rdr` is a shortcut for `react-docgen-readme`


1. Add the delimiter in your README file to indicate where you want to insert the docs

    ```markdown
    <!-- react-component-docs -->
    ```

2. Then add a new task in your package.json to generate the docs. Note that you must specify the path for the readme and for the components to be documented.

    ```json
    "scripts": {
        "docs": "rdr src/ --readmeFile docs/README.md"
    }
    ```


### Configuration

#### --readmeFile

**Default:** `'./README.md'`

The path to the readme file where generated documentation is appended.

#### --template

**Default:** `'react-docgen/readme/src/template.md'`

The path to the template used for generating the markdown documentation.

#### --delimiter

**Default:** `'react-components-docs'`

Use a custom delimiter. Used to let the tool know where to place the docs in your readme.

This generates `<!-- react-components-docs -->` and `<!-- react-components-docs:end -->` delimiters.

#### --ext

**Default:** `['.js', '.jsx']`

File extensions to consider. Used by `react-docgen`.


#### --ignoreDir

**Default:** `['node_modules', 'bower_components']`

Folders to ignore. Used by `react-docgen`.


## Running the project locally

Clone the project and from the root of the repo run the following commands:

    $ npm install
    $ npm link
    $ cd example/
    $ npm link react-docgen-readme

Then, from `example/` you can run `npm run docs` and see the magic happen.

### Debugging

With [iron-node](http://s-a.github.io/iron-node/)

    $ iron-node bin/cli.js components/ --readmeFile ./README.md

With [node-inspector](https://github.com/node-inspector/node-inspector)

    $ node-debug bin/cli.js components/ --readmeFile ./README.md


## License

Distributed under the MIT license.

## TO-DO