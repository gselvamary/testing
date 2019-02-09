const express = require('express');
const router = express.Router();
// User Model
const Question = require('../../../models/coordinator/questions');


//For FIle Upload // initialize multer in index.js too
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)

    }
});
const fileFilter = (req, file, cb) => {
    //reject a filter:
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/tiff') {
        //        console.log("yes")
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter,
});


//To get questions list from database
router.get('/questions', (req, res) => {
    Question.find()
        .sort({ Q_ID: -1 })
        .then(questions => res.json(questions));
});


//To add a new question
router.post('/add', upload.single('file'), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    // Form validation
    //  const { errors, isValid } = validateQuestionInput(req.body);
    // Check validation
    /*  if (!isValid) {
          return res.status(400).json(errors);
      }
      */
    /* Question.findOne({ Q_ID: req.body.Q_ID }).then(question => {
         if (question) {
             return res.status(400).json({ qid: "Question ID already exists" });
         }
         else {
             */
    if (Question.find({ CAT_ID: req.body.CAT_ID } && { TOPIC_ID: req.body.TOPIC_ID }).countDocuments(function (err, count) {
        if (count === 0) {
            Q_ID = req.body.CAT_ID + '' + req.body.TOPIC_ID + '' + 10001;
            console.log(Q_ID);
            const newQuestion = new Question({
                CAT_ID: req.body.CAT_ID,
                TOPIC_ID: req.body.TOPIC_ID,
                Q_ID: Q_ID,
                Q_NAME: req.body.Q_NAME,
                Q_DESC: req.body.Q_DESC,
                OPT_1: req.body.OPT_1,
                OPT_2: req.body.OPT_2,
                OPT_3: req.body.OPT_3,
                OPT_4: req.body.OPT_4,
                ANS_ID: req.body.ANS_ID,
                HINT: req.body.HINT,
                TAGS: req.body.TAGS,
                LEVEL: req.body.LEVEL,
                Q_IMAGE: req.file.path
            });
            console.log(newQuestion);
            newQuestion.save()
                .then(question => res.json(question))
                .catch(err => console.log(err));
            console.log(newQuestion);
        }
        else if (count > 0) {
            Question.find({ CAT_ID: req.body.CAT_ID } && { TOPIC_ID: req.body.TOPIC_ID }).sort({ Q_ID: -1 }).limit(1).then(question => {
                if (question) {
                    Q_ID = question[0].Q_ID + 1;
                    console.log(question);

                    const newQuestion = new Question({
                        CAT_ID: req.body.CAT_ID,
                        TOPIC_ID: req.body.TOPIC_ID,
                        Q_ID: Q_ID,
                        Q_NAME: req.body.Q_NAME,
                        Q_DESC: req.body.Q_DESC,
                        OPT_1: req.body.OPT_1,
                        OPT_2: req.body.OPT_2,
                        OPT_3: req.body.OPT_3,
                        OPT_4: req.body.OPT_4,
                        ANS_ID: req.body.ANS_ID,
                        HINT: req.body.HINT,
                        TAGS: req.body.TAGS,
                        LEVEL: req.body.LEVEL,
                        Q_IMAGE: req.file.path
                    });
                    newQuestion.save()
                        .then(question => res.json(question))
                        .catch(err => console.log(err));
                    console.log(newQuestion);
                }
            })
        }
    }));

}) /*
        
       
    });
});
*/

module.exports = router;

