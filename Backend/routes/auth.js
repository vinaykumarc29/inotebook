const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    check("Name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),

    check("Email")
      .isEmail()
      .withMessage("Enter A Valid Email")
      .normalizeEmail(),

    check("Password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const { Name, Email, Password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUser = await User.create({
        Name: Name,
        Email: Email,
        Password: Password,
      });

      res.status(201).json(newUser);

    } catch (error) {
      res.status(500).json({ error: `Error creating user: ${error.message}` });
    }
  }
);

module.exports = router;
