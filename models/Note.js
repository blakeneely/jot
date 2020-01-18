const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const NoteSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Note = mongoose.model('note', NoteSchema);