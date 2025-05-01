const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Route no :1 which Adds the node - login required
router.post(
  "/addnote",
  fetchuser,
  [
    //Applies condition to fields
    check("Title")
      .isLength({ min: 1 })
      .withMessage("Title should be atleast 1 character"),
    check("Description")
      .isLength({ min: 1 })
      .withMessage("Description should be atleast 1 character"),
  ],
  async (req, res) => {
    const { Title, Description, Tag } = req.body;
    // express-validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //creating new note
      const note = new Note({
        Title,
        Description,
        Tag,
        user: req.user.user_id,
      });

      const savednote = await note.save();
      res.status(200).json(savednote);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "something went wrong " });
    }
  }
);

// Route no:2 displays all notes of an user -login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Route no: 3 update note

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const _id = req.params.id; // takes id from url
    let note = await Note.findOne({ _id });

    // checks if note exists
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    //checks if  user is trying to update his own note or others
    if (note.user.toString() !== req.user.user_id) {
      return res.status(401).json("Not allowed to update the note");
    }

    const { Title, Description, Tag } = req.body;

    let newNote = {};

    // takes new changes

    if (Title) newNote.Title = Title;
    if (Description) newNote.Description = Description;
    if (Tag) newNote.Tag = Tag;

    note = await Note.findByIdAndUpdate(_id, { $set: newNote }, { new: true });

    // console.log((note.user).toString());
    // console.log(req.user.user_id);

    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
});



module.exports = router;
