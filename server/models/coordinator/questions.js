const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const QuestionsSchema = new Schema({
    CAT_ID: {
        type: Number,
        required: true
    },
    TOPIC_ID: {
        type: Number,
        required: true
    },
    Q_ID: {
        type: Number,
        required: true
    },
    Q_NAME: {
        type: String,
        required: true
    },
    Q_DESC: {
        type: String,
        required: true
    },
    OPT_1: {
        type: String,
        required: true
    },
    OPT_2: {
        type: String,
        required: true
    },
    OPT_3: {
        type: String,
        required: true
    },
    OPT_4: {
        type: String,
        required: true
    },
    ANS_ID: {
        type: String,
        required: true
    },
    HINT: {
        type: String,
        required: false
    },
    TAGS: {
        type: String,
        required: false
    },
    LEVEL: {
        type: Number,
        required: true
    },
    Q_IMAGE: {
        type: String,
        required: false
    },
    OPT1_IMAGE: {
        type: String,
        required: false
    },
    OPT2_IMAGE: {
        type: String,
        required: false
    },
    OPT3_IMAGE: {
        type: String,
        required: false
    },
    OPT4_IMAGE: {
        type: String,
        required: false
    }
});

module.exports = Question = mongoose.model('question', QuestionsSchema);