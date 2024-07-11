
const express = require('express');
const router = express.Router();
const SaveNoteControllers = require('../controllers/savenoteController');

const requireAuth = require('../middleware/requireAuth');


router.use(requireAuth);

// get all notes

router.get('/notes', SaveNoteControllers.getAllNotes);

// add note
router.post('/addnote', SaveNoteControllers.addNote);

// delete note

router.delete('/deletenote/:id', SaveNoteControllers.deleteNote);

module.exports = router;