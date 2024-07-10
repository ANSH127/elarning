const SaveNote = require('../models/savenoteModel');

// get all  user notes

const getAllNotes = async (req, res) => {
    try {
        const notes = await SaveNote.find({ uid: req.user._id });
        res.status(200).json({ notes });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// add note

const addNote = async (req, res) => {
    
    const { title, note } = req.body;
    try {
        const newNote = await SaveNote.create({ title, note, uid: req.user._id });
        res.status(201).json({ newNote });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { getAllNotes, addNote };