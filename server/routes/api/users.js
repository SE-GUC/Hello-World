const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const router = express.Router();

//Load Validation
const validator = require("../../validation/userValidation");

// Load Models
const Admin = require("../../models/Admin");
const User = require("../../models/User");

// Register & Login Validation

// To Be Used For Register & Login

// @route   POST api/users/register
// @desc    Register User
// @access  public
router.post("/register", async (req, res) => {
  const isValidated = validator.registerValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({ data: "Username not available" });
    }
    if (req.body.password !== req.body.password2) {
      return res.status(400).json({ data: "Passwords do not match" });
    }
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save();
      });
    });
    return res.json({ data: "User Successfully registered" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

// @route   POST api/users/register
// @desc    Register User
// @access  public
router.post("/login", async (req, res) => {
  const isValidated = validator.loginValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });

  if (!user) {
    return res
      .status(404)
      .json({ unregistered: "No user registered by this username" });
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Password Incorrect" });
  }
  const payload = { id: user.id, username: user.username };
  jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
    res.json({ success: true, token: "Bearer " + token });
  });
});

router.post("/admin/:id", async (req, res) => {
  const name = req.body.name;
  const user = req.params.id;
  try {
    const newAdmin = await Admin.create({
      name,
      user
    });
    res.json({ msg: "Admin created successfully", data: newAdmin });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
