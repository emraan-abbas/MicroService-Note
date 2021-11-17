const Note = require("../models/note-model");

// Saving Notes to DB
exports.create = (req, res) => {
  if (!(req.body.subject && req.body.title && req.body.content)) {
    return res.status(400).send({
      message: "Subject, Title and Content cannot be EMPTY !",
    });
  }
  const note = new Note({
    subject: req.body.subject,
    title: req.body.title,
    content: req.body.content,
  });
  note
    .save()
    .then((addedNotes) => {
      res.send(addedNotes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error at Creating Note",
      });
    });
};

// Getting ALL Notes from DB
exports.findALL = (req, res) => {
  Note.find({})
    .then((allNotes) => {
      res.send(allNotes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

// Getting SPECIFIC Note from DB
exports.findOne = async (req, res) => {
  try {

      const note = await Note.findOne({ _id: req.params.noteID });
      console.log("TRY CODE HERE",note);
      
      if (note){
        return res.send(note);
      }
      else {
        return res.status(404).send({
          message:
            "Error retreving Note with ID: " + req.params.noteID,
          });
      }
      
  } 
  catch( err ) {
    console.log("ERROR HERE NOTE",err);
      return res.status(500).send({
      message:
        err.message || "Error retreving Note with ID: " + req.params.noteID,
      });
  }

  // .then((uniqueNote) => {
  //   if (!uniqueNote) {
  //     return res.status(400).send({
  //       message: "No NOTE found with ID: " + req.params.noteID,
  //     });
  //   } else {
  //     res.send(uniqueNote);
  //   }
  // })
  // .catch((err) => {
  //   return res.status(500).send({
  //     message: err.message || "Error retreving Note with ID: " + req.params.noteID,
  //   });
  // });
};

// Edit / Updating a SPECIFIC Note
exports.update = (req, res) => {
  if (!(req.body.subject && req.body.title && req.body.content)) {
    return res.status(400).send({
      message: "Subject, Title and Content cannot be EMPTY !",
    });
  }
  Note.findByIdAndUpdate(
    req.params.noteID,
    {
      subject: req.body.subject,
      title: req.body.title,
      content: req.body.content,
    },
    { new: true }
  )
    .then((updateNote) => {
      if (!updateNote) {
        return res.status(400).send({
          message: "Note Not Found with ID: " + req.params.noteID,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Error updating note with id " + req.params.noteId,
      });
    });
};

// Deleting a SPECIFIC Note
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteID)
    .then((deleteNote) => {
      if (!deleteNote) {
        return res.status(404).send({
          message: "Note not found with ID " + req.params.noteID,
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Could not delete note with id " + req.params.noteID,
      });
    });
};
