const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const NoteSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Note = mongoose.model('note', NoteSchema);