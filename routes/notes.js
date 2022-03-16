const notes = require('express').Router();
const path = require('path');
const fs = require('fs');

notes.get('/', (req, res) => {
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

    const readAndAppend = (content, file) => {
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
          } else {
            const parsedData = JSON.parse(data);
            // console.log(`content is: ${JSON.stringify(content)}`);
            parsedData.push(content);
            writeToFile(file, parsedData);
          }
        });
    };

    const writeToFile = (destination, content) =>
        fs.writeFile(destination, JSON.stringify(content), (err) =>
        err ? console.error(err) : console.log(`\nData written to ${destination}`)
    );

    const { title, text } = req.body;
    const idContent = {
        'id': getUUID(),
        'title': title,
        'text': text,   
    };
    // console.log(`idcontent is: ${JSON.stringify(idContent)}`);
    readAndAppend (idContent, './db/db.json');
    res.json({status:'success'});
});

notes.delete('/:id', (req, res) => {
  const itemID = req.params.id;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
    const parsedData = JSON.parse(data);
    // Make a new array of all items except the one with the ID provided in the URL
    const result = parsedData.filter((title) => title.id !== itemID);
    // console.log(`result is ${JSON.stringify(result)}`);
    
    fs.writeFile('./db/db.json', JSON.stringify(result), (err) =>
      err ? console.error(err) : console.log(`\nData written to ./db/db.json`)
    )
    };
  });

  res.json ({'message': `ID ${itemID} removed from db.json.`});
});

module.exports = notes;