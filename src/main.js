#!/usr/bin/env node

const fs = require('fs');
const parseCliArgs = require('command-line-args');
const jsonpath = require('jsonpath').query.bind(require('jsonpath'));
const getStdin = require('get-stdin');

const optionDefinitions = [
  { name: 'file', alias: 'f', type: String },
];

const options = parseCliArgs(optionDefinitions, { partial: true });

if (!options._unknown) {
    console.error(`No jsonpath query specified.`);
    process.exit(1);
}

let fetchJsonContent;

if (options.file) {
    fetchJsonContent = new Promise((resolve, reject) => {
        fs.readFile(options.file, 'utf-8', (error, content) => {
            if (error) {
                reject(error);
            } else {
                resolve(content);
            }
        });
    });
} else {
    fetchJsonContent =  getStdin();
}

fetchJsonContent
    .then(content => {
        if (!content) {
            throw new Error(`No JSON content`);
        }

        return JSON.parse(content);
    })
    .then(document => {
        console.log(jsonpath(document, options._unknown.join(' ')));
    })
    .catch(error => {
        console.error(error.message);
        process.exit(2);
    });
