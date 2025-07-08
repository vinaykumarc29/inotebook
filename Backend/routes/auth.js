const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const secretKey = "Vin@y$";

// route no 1 for user singup and entry in database
router.post(
  "/signup",
  // express validator usage - Applies Conditions To Fields
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
    // Avoids Duplication and gives accurate error that email aleady exists

    let newUser = await User.findOne({ Email: Email });
    if (newUser) {
      res.status(400).json("A User Already Exists With Same Email");
      return;
    }

    const hashedPassword = await bcrypt.hash(Password, 10); //password hashing

    // User Data being stored

    try {
      newUser = await User.create({
        Name: Name,
        Email: Email,
        Password: hashedPassword,
      });

      // creating a jwt token

      const authToken = jwt.sign(
        {
          user_id: newUser._id,
          Email: newUser.Email,
        },
        secretKey
      );

      res.status(201).json({ authToken });
    } catch (error) {
      res.status(500).json({ error: `Error creating user: ${error.message}` });
    }
  }
);

//Route no 2 for user login
router.post(
  "/login",
  [
    check("Email")
      .isEmail()
      .withMessage("Enter A Valid Email")
      .normalizeEmail(),
    check("Password")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isLength({ min: 6 })
      .withMessage("Password Should Contain Atleast 6 Characters"),
  ],
  async (req, res) => {
    const { Email, Password } = req.body;
    // checks erros in input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Finding user
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json("User Not Found");
    }
    // checking password
    const checkPass = await bcrypt.compare(Password, user.Password);
    if (!checkPass) {
      return res.status(400).json("Incorrect Password");
    }

    //sending token after authorization completed
    const authToken = jwt.sign(
      {
        user_id: user._id,
        Email: user.Email,
      },
      secretKey
    );

    res.status(201).json({ authToken });
  }
);

//route no 3 to getuser
router.get("/getuser", fetchuser, async(req, res) => {

try {
  const  userId = req.user.user_id;
  // console.log(userId);
  const user = await User.findOne({ _id:userId }).select("-Password");
  // console.log(user);
  res.status(200).json(user);
  
} catch (error) {
  console.log(error);
  res.status(400).send({error});
  
}


});

module.exports = router;
