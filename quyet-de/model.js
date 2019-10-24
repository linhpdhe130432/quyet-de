const mongoose = require('mongoose');

//Create Structure of mongo

const QuestionSchema = new mongoose.Schema({
    content: {
        type: String, // type of values (String,number,Boolean,[type],{},...) * Require
        required: true, // can not be null
    },
    like: {
        type: Number,
        default: 0, //default values of this 
    },
    dislike: {
        type: Number,
        default: 0, //default values of this 
    }
}, // added option
{
    timestamps: true, // write meta of this: time change, time write
});

const QuestionsModel = mongoose.model('Question',QuestionSchema);

module.exports = QuestionsModel;
