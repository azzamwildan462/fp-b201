const mongoose = require('mongoose');
const User = require('../models/userModel');
const UserData = require('../models/userDataModel');
const {header} = require('../utils/header');
const {binerToInstruments} = require('../utils/binerToInstruments');
const {getBodyData,
getHeader} = require('../utils/requestParser');
const {jwt_env} = require('../utils/yaml-parser');
const {safetyCreateUser,
safetyUserLogin} = require('../utils/safety');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getUserInfo = async (req,res,uname) => {
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

            if(!user_data.instruments){
                res.writeHead(404,header);
                res.write(JSON.stringify({
                    message: 'This user has not update his data'
                }));
                res.end();
                return;
            }

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
// Beta
const findNearby = async (req,res,treshold) => {
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
            //This need to be proceed
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

const updateDate = async (req,res,uname) => {
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
            getBodyData(req, async result => {
                const user = await User.findByUname(JSON.parse(result).username);

            })
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
    getUserInfo,
    findNearby
};