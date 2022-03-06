const mongoose = require('mongoose');
const User = require('../models/userModel');
const header = require('../utils/header');

//Next, just play with JWT, CRUD, and data control

const getUserInfo = async (req,res,uname) => {
    //Use JWT here
    try {
        const user_data = await User.findByUname(uname);
         if(!user_data){
             res.writeHead(404,header);
             res.write(JSON.stringify({
                 message: 'Username not Found'
             }));
             res.end();
         }
         else {
            console.log(user_data);
            res.writeHead(404,header);
            res.write(JSON.stringify(user_data));
            res.end();
         }
    } catch (e){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
};

module.exports = {
    getUserInfo
};
