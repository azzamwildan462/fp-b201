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



//Next, just play with JWT, CRUD, and data control

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
            if(!await safetyCreateUser(JSON.parse(result),res))
            {
                return;
            }
            const success = await User.createUser(JSON.parse(result));
            if(!success){
                res.writeHead(500,header);
                res.write(JSON.stringify({
                    message: 'An error occured on DB'
                }));
                res.end();
            }
            else {
                const token = await jwt.sign({username: JSON.parse(result).username},jwt_env.secret_token,{ expiresIn: '1800s' });
                res.writeHead(200,{...header,
                    Authorization: `Bearer ${token}`});
                res.write(JSON.stringify({
                    message: 'Register success'
                }));
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

const userLogin = async (req,res) => {
    try {
        getBodyData(req, async result => {
            if(!await safetyUserLogin(JSON.parse(result),res))
            {
                return;
            }

            const user = await User.findByUname(JSON.parse(result).username);

            bcrypt.compare(JSON.parse(result).password,user.password,function(err,isMatch){
                if(err){
                    res.writeHead(500,header);
                    res.write(JSON.stringify({
                        message: 'There is internal server error'
                    }));
                    res.end();
                    return err;
                }
                if(isMatch){
                    const token = jwt.sign({username: JSON.parse(result).username},jwt_env.secret_token,{ expiresIn: '1800s' });
                    res.writeHead(200,{...header,
                        Authorization: `Bearer ${token}`});
                    res.write(JSON.stringify({
                        message: 'Login success'
                    }));
                    res.end();
                }
                else {
                    res.writeHead(404,header);
                    res.write(JSON.stringify({
                        message: 'Invalid Password!'
                    }));
                    res.end();
                }
            })
        })
    }catch(e){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
};

const deleteUser = async (req,res,uname) => {
    try {
        const buff = await User.findByUname(uname);
        if(!buff){
            res.writeHead(404,header);
            res.write(JSON.stringify({
                message: 'Username not Found'
            }));
            res.end();
        }
        else {
            const ret = await User.deleteByUname(uname);

            if(!ret){
                res.writeHead(500,header);
                res.write(JSON.stringify({
                    message: 'Error occured while delete this user'
                }));
                res.end();
            }
            else {
                res.writeHead(200,header);
                res.write(JSON.stringify(ret));
                res.end();
            }
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
    createNewUser,
    userLogin,
    deleteUser
};
