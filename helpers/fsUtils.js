const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    // First we have to retrieve the CURRENTLY SAVED data
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Data type:", typeof data);
            // we have to convert the data to something more useable (JSON --> JS)
            const parsedData = JSON.parse(data);
            // We can easy ADD/REMOVE the new data to our dataset
            parsedData.push(content);
            // Make sure we RE_WRTIE the new dataset
            writeToFile(file, parsedData);
        }
    });
};
const readAndRemove = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parData = JSON.parse(data);
            parData.splice(id, 1);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
