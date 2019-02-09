const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User Model
const User = require('../../models/user');

router.get('/', (req, res) => {
  User.find()
    .sort({ USER_ID: -1 })
    .then(users => res.json(users));
});

// @route POST /users/register
// @desc Register user
// @access Public

router.post('/register', (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ USER_ID: req.body.USER_ID }).then(user => {
    if (user) {
      return res.status(400).json({ email: "User already registered" });
    }

    const newUser = new User({
      USER_ID: req.body.USER_ID,
      FIRST_NAME: req.body.FIRST_NAME,
      LAST_NAME: req.body.LAST_NAME,
      MAIL_ID: req.body.MAIL_ID,
      MOBILE: req.body.MOBILE,
      ROLE: req.body.ROLE,
      PASSWORD: req.body.PASSWORD,
      DOB: req.body.DOB,
      DEPT: req.body.DEPT,
    });

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.PASSWORD, salt, (err, hash) => {
        if (err) throw err;
        newUser.PASSWORD = hash;

        newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route POST /users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  //console.log(req.body);
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const USER_ID = req.body.USER_ID;
  const PASSWORD = req.body.PASSWORD;

  //console.log(req.body);

  // Find user by USER_ID
  User.findOne({ USER_ID }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernotfound: "User not found" });
    }
    // Check password
    bcrypt.compare(PASSWORD, user.PASSWORD).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.USER_ID,
          name: user.FIRST_NAME,
          role: user.ROLE
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 600 // 10 seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );

      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});






router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove()
      .then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


router.delete('/:USER_ID', (req, res) => {
 // console.log(req.params.USER_ID);

  User.findOne({ USER_ID: req.params.USER_ID })
    .then(user => user.remove()
      .then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


router.get('/:USER_ID', (req, res) => {
  User.findOne({ USER_ID: req.params.USER_ID })
    .then(user => {
      res.json(user)
    })
    .catch(err => console.log("No such user"));
});



module.exports = router;

