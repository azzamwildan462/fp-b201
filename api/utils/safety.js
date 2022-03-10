const User = require('../models/userModel');
const {header} = require('./header');
const safetyCreateUser = async (user,res) => {
    const buffer = await User.findByUname(user.username);
    if(!buffer){
        return 1;
    }
    else {
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'Username has been used'
        }));
        res.end();
        return 0;
    }
    
};

const safetyUserLogin = async (user,res) => {
    if(!user.username){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'Insert Username!'
        }));
        res.end();
        return 0;
    }
    if(!user.password){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'Insert Password!'
        }));
        res.end();
        return 0;
    }

    const buffer = await User.findByUname(user.username);
    if(!buffer){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'Username not found'
        }));
        res.end();
        return 0;
    }


    return 1;
};

module.exports = {
    safetyCreateUser,
    safetyUserLogin
};