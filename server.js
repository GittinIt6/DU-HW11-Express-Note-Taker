const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

//use express
const app = express();

//Middleware for API routing calls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// use of static files in public directory
app.use(express.static('public'));

// GET Route for notes.html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for homepage index.html
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);