var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
    username: {
        "bsonType": "string",
        require: true,
        unique: true
    },
    instruments: {
        "bsonType": "array",
        "maxItems": 20,
        require: true
    },
    skill_level:{
        "bsonType": "int",
        default: 0
    },
    x_coord: {
        "bsonType": "double"
    },
    y_coord: {
        "bsonType": "double"
    },
    contacts: {
        whatsapp: {
            "bsonType": "string",
        },
        id_line: {
            "bsonType": "string",
        },
        instagram: {
            "bsonType": "string",
        },
    },
    created: {
        "bsonType": "date",
        default: Date.now
    }
});

var User = mongoose.model('User',user_schema);

module.exports = User;