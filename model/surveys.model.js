const User = require('./user.model')
const mongoose = require('mongoose');
let recipentSchema = new mongoose.Schema({
    email       : String,
    response    : {type: Boolean, default: false}
})
let surveySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : User
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    recipents: [recipentSchema],
    TotalYes : {
        type    : Number,
        default : 0
    },
    TotalNo : {
        type    : Number,
        default : 0
    } 
});

const Surveys  = mongoose.model('Surveys', surveySchema);

module.exports = Surveys;
