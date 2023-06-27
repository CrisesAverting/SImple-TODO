const notes = require('express').Router();
const notesDB = require('../db/db.json');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => res.status(200).json(notesDB)
// {readFromFile('./db/db.json')
);
    

notes.delete('/:id', (req, res) => {
    const id = res.params.id;
    // const delNote = 
    console.log(req.param.id);
    });
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    // check both a title and text are not false return error
    if (!title || !text) {

        return res.status(500).json({ msg: 'Unable to save your note, verify all required fields are filled' });
    } else {
        //create a new note object and assign unique ID
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        notesDB.push(newNote);
        console.log(newNote);
        const response = {
            status: 'success',
            body: newNote,
        };

        fs.writeFile("./db/db.json", JSON.stringify(notesDB), (err) =>
            err ? console.error(err) : console.log("New note saved")
        );
        //await or add .then
        //raced condition trying to modify data and pull data at the same
        res.json(response);
        // res.status(201).json(response);
    };

});

module.exports = notes;