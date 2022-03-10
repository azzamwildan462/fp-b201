const mongoose = require('mongoose');
const User = require('../models/userModel');
const UserData = require('../models/userDataModel');
const {header} = require('../utils/header');
const {binerToInstruments} = require('../utils/binerToInstruments');
const {getBodyData,
getHeader} = require('../utils/requestParser');
const {jwt_env} = require('../utils/yaml-parser');
const {safetyCreateUser} = require('../utils/safety');
const jwt = require('jsonwebtoken');

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
            const user_data = await UserData.findByUname(uname);

            user_data.instruments = await binerToInstruments(user_data.instruments);

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

const createNewUser = async (req,res) => {
    try {
        getBodyData(req, async result => {
            if(!await safetyCreateUser(JSON.parse(result)))
            {
                res.writeHead(404,header);
                res.write(JSON.stringify({
                    message: 'Username has been used'
                }));
                res.end();
                return;
            }
            const success = await User.createUser(JSON.parse(result));
            if(!success){
                res.writeHead(404,header);
                res.write(JSON.stringify({
                    message: 'There is an error, maybe??'
                }));
                res.end();
            }
            else {
                const token = await jwt.sign({username: JSON.parse(result).username},jwt_env.secret_token,{ expiresIn: '1800s' });
                res.writeHead(200,{...header,
                    Authorization: `Bearer ${token}`});
                res.end();
            }
        })
    } catch (e){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
};

module.exports = {
    getUserInfo,
    createNewUser
};
