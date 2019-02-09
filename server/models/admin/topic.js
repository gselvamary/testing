const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TopicSCheme = new Schema({
    TOPIC_ID: {
        type: Number,
        required: true
    },
    TOPIC_NAME: {
        type: String,
        required: true
    },
    CAT_ID:{
        type: Number,
        required: true
},
CAT_NAME:{
    type: String,
    required: true
},
});

module.exports = Topic = mongoose.model('topic', TopicSCheme);