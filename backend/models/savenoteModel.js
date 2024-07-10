

const mongoose = require('mongoose');

const saveNoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    uid:{
        type:String,
        required:true
    }
});

const SaveNote = mongoose.model('SaveNote', saveNoteSchema);

module.exports = SaveNote;