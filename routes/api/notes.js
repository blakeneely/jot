const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Note Model
const Note = require('../../models/Note');

// GET /api/notes route to GET all notes and sort decending by date
router.get('/', (req, res) => {
    Note.find()
        .sort({ date: -1 })
        .then(notes => res.json(notes))
});

// POST /api/notes route to POST notes
router.post('/', auth, (req, res) => {
    const newNote = new Note({
        text: req.body.text
    });
    newNote.save().then(note => res.json(note));
});

// DELETE /api/notes/:id route to DELETE notes
router.delete('/:id', auth, (req, res) => {
    Note.findById(req.params.id)
    .then(note => note.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success:false}));
});

module.exports = router;