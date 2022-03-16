const User = require('../models/userModel');
const {header} = require('./header');
const { status_code } = require('js-yaml')

const safetyCreateUser = async (user,res) => {
    if(!user.username){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Insert Username!'
        }));
        res.end();
        return 0;
    }
    if(!user.password){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Insert Password!'
        }));
        res.end();
        return 0;
    }

    if(JSON.stringify(user.password).length < 6){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Password too short'
        }));
        res.end();
        return 0;
    }
    
    const buffer = await User.findByUname(user.username);
    if(!buffer){
        return 1;
    }
    else {
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Username has been used'
        }));
        res.end();
        return 0;
    }
    
};

const safetyUserLogin = async (user,res) => {
    if(!user.username){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Insert Username!'
        }));
        res.end();
        return 0;
    }
    if(!user.password){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Insert Password!'
        }));
        res.end();
        return 0;
    }
    // console.log(user.password.lenght);
    if(JSON.stringify(user.password).length < 6){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Password too short'
        }));
        res.end();
        return 0;
    }

    const buffer = await User.findByUname(user.username);
    if(!buffer){
        res.writeHead(status_code.NOT_FOUND,header);
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