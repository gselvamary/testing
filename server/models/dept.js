const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DeptSchema = new Schema({
    DEPT: {
        type: Number,
        required: true
    },
    DEPT_NAME: {
        type: String,
        required: true
    },
    DEPT_SNAME: {
        type: String,
        required: true
    }
});

module.exports = Dept = mongoose.model('dept', DeptSchema);