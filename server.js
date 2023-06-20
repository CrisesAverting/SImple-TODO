const express = require("express");
const path = require('path');
const api = require('./routes/index.js');
//const { clog } = require('./helpers/clog');
const PORT = 3001;

const app = express();
console.log('app created')
// const router = express.Router();
console.log('router created')
app.use(express.json)
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use(express.static('public'));
// GET Route for notes
app.get('/', (req, res) => {
    console.log('hit me one more time')
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
//catch all

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});