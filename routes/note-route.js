const express = require("express");
const router = express.Router();

const noteController = require("../controllers/note-controller");
const auth = require('../auth')

router.post ('/create-note', noteController.create);
router.get ('/view-notes', auth, noteController.findALL);
router.get ('/search/:noteID', noteController.findOne);
router.put ('/edit/:noteID', noteController.update);
router.delete ('/delete/:noteID', noteController.delete);

module.exports = router;

