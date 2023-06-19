const express = require("express");
const path = require('path');
const api = require('./routes/index.js');

const PORT = 3001;

const app = express();

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
