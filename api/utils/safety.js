const User = require('../models/userModel');
const {header} = require('./header');
const { status_code } = require('./yaml-parser')

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

    const buff = JSON.stringify(user.username);
    // console.log(JSON.stringify(user.username).length-2,JSON.stringify(user.username).split('"')[1]," -> ",buff.split('"')[1].match(/[a-zA-Z0-9]+$/g), " ",JSON.stringify(buff.split('"')[1].match(/[a-zA-Z0-9]+$/g)).length-4);
    if(!JSON.stringify(user.username).split('"')[1].match(/[a-zA-Z0-9]+$/g)){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Invalid Username!'
        }));
        res.end();
        return 0;
    }

    if(JSON.stringify(user.username).length-2 != JSON.stringify(buff.split('"')[1].match(/[a-zA-Z0-9]+$/g)).length-4){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Invalid Username!'
        }));
        res.end();
        return 0;
    }

    if(JSON.stringify(user.password).length < 8){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Password too short'
        }));
        res.end();
        return 0;
    }

    if(JSON.stringify(user.password).length > 255){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Password too long'
        }));
        res.end();
        return 0;
    }

    if(JSON.stringify(user.username).length > 255){
        res.writeHead(status_code.BAD_REQUEST,header);
        res.write(JSON.stringify({
            message: 'Username too long'
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
    if(JSON.stringify(user.password).length < 8){
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