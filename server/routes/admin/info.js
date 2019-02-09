const express = require('express');
const router = express.Router();

// Load input validation
const validateCategoryInput = require("../../validation/admin/categories");
const validateTopicInput = require("../../validation/admin/categories");

// User Model
const Category = require('../../models/admin/categories');
const Topic = require('../../models/admin/topic')

router.get('/', (req, res) => {
  Category.find()
    .sort({ CAT_ID: 1 })
    .then(categories => res.json(categories));

});

router.get('/topics', (req, res) => {
  Topic.find()
    .sort({ TOPIC_ID: 1 })
    .then(topics => res.json(topics));
});


// @route POST /categories/addcategory
// @desc
// @access Public

router.post('/addcategory', (req, res) => {

  /* Form validation
  const { errors, isValid } = validateCategoryInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
*/
  var CAT_ID;
  // const CAT_ID = req.body.CAT_ID;
  // const CAT_NAME = req.body.CAT_NAME;
  Category.findOne({ CAT_NAME: req.body.CAT_NAME }).then(category => {
    if (category) {
      return res.status(400).json({ CAT_NAME: "Category is already added" });
    }
    else {
      if (Category.countDocuments(function (err, count) {
        if (count === 0) {
          CAT_ID = 11 + count;
          // console.log(CAT_ID);

          const newCategory = new Category({
            CAT_ID: CAT_ID,
            CAT_NAME: req.body.CAT_NAME,
          });
          // console.log(newCategory);
          newCategory.save()
            .then(category => res.json(category))
            .catch(err => console.log(err));

        }
        else if (count > 0) {
          Category.find({}).sort({ CAT_ID: -1 }).limit(1).then(category => {
            if (category) {
              CAT_ID = category[0].CAT_ID + 1;
              const newCategory = new Category({
                CAT_ID: CAT_ID,
                CAT_NAME: req.body.CAT_NAME,
              });
              //   console.log(newCategory);
              newCategory.save()
                .then(category => res.json(category))
                .catch(err => console.log(err));
            }
          });
        }
      }));
    }
  });
});

router.post('/addtopic', (req, res) => {
  /* Form validation
  const { errors, isValid } = validateCategoryInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
*/
  var TOPIC_ID_new;

  var CAT_NAME_new;

  Category.findOne({ CAT_ID: req.body.CAT_ID }).then(cat => {
    if (cat)
      CAT_NAME_new = cat.CAT_NAME;
  });

  Topic.find({ "TOPIC_NAME": req.body.TOPIC_NAME }).then(topic => {
    if (topic) {
      for (i = 0; i < topic.length; i++) {
        if (topic[i].TOPIC_NAME === req.body.TOPIC_NAME && topic[i].CAT_ID === req.body.CAT_ID)
          return res.status(400).json({ TOPIC_NAME: "TOPIC is already added" });
      }
      if (Topic.countDocuments(function (err, count) {
        if (count === 0) {
          TOPIC_ID_new = 101 + count;
          //   console.log(TOPIC_ID_new);
          const newTopic = new Topic({
            TOPIC_ID: TOPIC_ID_new,
            CAT_ID: req.body.CAT_ID,
            TOPIC_NAME: req.body.TOPIC_NAME,
            CAT_NAME: CAT_NAME_new

          });

          newTopic.save()
            .then(topic => res.json(topic))
            .catch(err => console.log(err));

        }
        else
          if (count > 0) {
            Topic.find({}).sort({ TOPIC_ID: -1 }).limit(1).then(topic => {
              if (topic) {
                TOPIC_ID_new = topic[0].TOPIC_ID + 1;
                //  console.log(TOPIC_ID_new);
                const newTopic = new Topic({
                  TOPIC_ID: TOPIC_ID_new,
                  TOPIC_NAME: req.body.TOPIC_NAME,
                  CAT_ID: req.body.CAT_ID,
                  CAT_NAME: CAT_NAME_new

                });
                newTopic.save()
                  .then(topic => res.json(topic))
                  .catch(err => console.log(err));
              }
            });
          }
      }));
    }
  });
});



router.delete('/remove topic', (req, res) => {
  Topic.findById(req.params.id)
    .then(user => user.remove()
      .then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
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
