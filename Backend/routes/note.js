const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { check,validationResult } = require("express-validator");
const router = express.Router();

// Route no :1 which Adds the node - login required
router.post(
  "/addnote",
  fetchuser,
  [
    //Applies condition to fields
    check("Title").isLength({min:1}).withMessage("Title should be atleast 1 character"),
    check("Description")
      .isLength({min:1})
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
      res.status(400).json({ error });
    }
  }
);

module.exports= router ;
