const express = require('express');
const router = express.Router();

// Dept Model
const Dept = require('../../models/dept');

router.get('/', (req, res) => {
    Dept.find()
        .sort({ DEPT: 1 })
        .then(depts => res.json(depts))
        .catch(err => console.log(err));
});


router.post('/', (req, res) => {
    const newDept = new Dept({
        DEPT: req.body.DEPT,
        DEPT_NAME: req.body.DEPT_NAME,
        DEPT_SNAME: req.body.DEPT_SNAME
    });
    newDept.save()
        .then(dept => res.json(dept))
        .catch(err => console.log(err));
});


router.delete('/:DEPT', (req, res) => {
    Dept.findOne({ DEPT: req.params.DEPT })
        .then(dept => dept.remove()
            .then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;

