const mongoose = require('mongoose');

const user_data_schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 255
    },
    instruments: {
        type: String,
        max: 20,
        required: true
    },
    skill_level:{
        type: Number,
        min: 0,
        max: 255,
        default: 0
    },
    x_coord: {
        type: Number,
        required: true
    },
    y_coord: {
        type: Number,
        required: true
    },
    contacts: {
        whatsapp: {
            type: String,
        },
        id_line: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
});

var UserData = mongoose.model('User_data',user_data_schema);

module.exports = UserData;