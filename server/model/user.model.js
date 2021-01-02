const mongoose = require('mongoose');


let UserSchema = new mongoose.Schema({
    profile_id: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;