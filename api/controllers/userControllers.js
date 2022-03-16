const mongoose = require('mongoose');
const User = require('../models/userModel');
const UserData = require('../models/userDataModel');
const {header} = require('../utils/header');
const {binaryToInstruments} = require('../utils/instrumentsDecoder');
const {getBodyData,
getHeader} = require('../utils/requestParser');
const {jwt_env} = require('../utils/yaml-parser');
const {safetyCreateUser,
safetyUserLogin} = require('../utils/safety');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createNewUser = async (req,res) => {
    try {
        getBodyData(req, async result => {
            if(!result){
                res.writeHead(404,header);
                res.write(JSON.stringify({
                    message: 'Error with no body data'
                }));
                res.end();
                return;
            }
            if(!await safetyCreateUser(JSON.parse(result),res))
            {
                return;
            }
            const success = await User.createUser(JSON.parse(result));
            const success_data = await UserData.createUserData(JSON.parse(result).username);
            if(!success || !success_data){
                res.writeHead(500,header);
                res.write(JSON.stringify({
                    message: 'An error occured on DB'
                }));
                res.end();
            }
            else {
                const token = await jwt.sign({username: JSON.parse(result).username},jwt_env.secret_token,{ expiresIn: '1800s' });
                res.writeHead(200,{...header,
                    Authorization: `There is fucking secret token ${token}`});
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
            if(!result){
                res.writeHead(404,header);
                res.write(JSON.stringify({
                    message: 'Error with no body data'
                }));
                res.end();
                return;
            }
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
                        Authorization: `There is fucking secret token ${token}`});
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
            return;
        }
        const authHeader = await getHeader(req, 'authorization');
        if(!authHeader){
            res.writeHead(404,header);
            res.write(JSON.stringify({
                message: 'Please login'
            }));
            res.end();
            return;
        }
        const authToken = authHeader.split(' ')[5];
        if(!authToken){
            res.writeHead(404,header);
            res.write(JSON.stringify({
                message: 'Do you login correctly?'
            }));
            res.end();
            return;
        }
        const user_verified = jwt.verify(authToken,jwt_env.secret_token);
        if(!user_verified){
            res.writeHead(404,header);
            res.write(JSON.stringify({
                message: 'You just doesnt register properly!'
            }));
            res.end();
            return;
        }
        
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
        
    } catch (e){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
};

module.exports = {
    createNewUser,
    userLogin,
    deleteUser
};
