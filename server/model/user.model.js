const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    profile_id: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String
    }
},{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;