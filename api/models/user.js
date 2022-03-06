const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('Users',user_schema);

module.exports = User;