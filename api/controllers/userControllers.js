const mongoose = require('mongoose');
const User = require('../models/userModel');
const UserData = require('../models/userDataModel');
const header = require('../utils/header');

//Next, just play with JWT, CRUD, and data control

const getUserInfo = async (req,res,uname) => {
    //Use JWT here??
    try {
        const user = await User.findByUname(uname);
         if(!user){
             res.writeHead(404,header);
             res.write(JSON.stringify({
                 message: 'Username not Found'
             }));
             res.end();
         }
         else {
            const user_data = await UserData.findByUname(uname)
            res.writeHead(200,header);
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
