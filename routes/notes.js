const notes = require('express').Router();
const notesDB = require('../db/db.json');
const { readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => res.status(200).json(notesDB));

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

        readAndAppend(newNote,'./db/db.json');
        const response = {
            status: 'success',
            body: newNote,
        };
        res.status(201).json(response);
    };
    
});

module.exports = notes;