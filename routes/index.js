const express = require('express');
const notesRouter = require('./notes');

const app = express();

//send /notes to ./notes
app.use('/notes', notesRouter);

module.exports = app;