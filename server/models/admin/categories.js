const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
    CAT_ID: {
        type: Number,
        required: true
    },
    CAT_NAME: {
        type: String,
        required: true
    }
});


module.exports = Category = mongoose.model('category', CategorySchema);