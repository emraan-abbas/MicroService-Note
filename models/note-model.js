const mongoose = require ("mongoose");
const schema = mongoose.Schema;

const NoteSchema = new schema({
    subject: String,
    title: String,
    content: String
})

const note = mongoose.model('note', NoteSchema);
module.exports = note;