const notes = require('express').Router();
const path = require('path');
const fs = require('fs');

notes.get('/', (req, res) => {
    // readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
    // res.json('../db/db.json');
    res.sendFile(path.join(__dirname, '../db/db.json'));

});

notes.post('/', (req, res) => {
    function getUUID() {
        const num = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
        return num;
    };

    console.log(getUUID());

    async const readAndAppend = (content, file) => {
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
          } else {
            //left of here, not working.
            // const uniqueID = getUUID();
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
          }
        });

});


module.exports = notes;