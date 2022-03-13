const mongoose = require('mongoose');
const User = require('../models/userModel');
const UserData = require('../models/userDataModel');
const {header} = require('../utils/header');
const {binaryToInstruments,instrumentsToBinary,compare} = require('../utils/instrumentsDecoder');
const {getBodyData,
getHeader} = require('../utils/requestParser');
const {jwt_env} = require('../utils/yaml-parser');
const {safetyCreateUser,
safetyUserLogin} = require('../utils/safety');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {pythagoras} = require('../utils/math');

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

            user_data.instruments = await binaryToInstruments(user_data.instruments);

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
const findNearby = async (req,res,uname,treshold) => {
    try {
        const user = await UserData.findByUname(uname);
        if(!user){
            res.writeHead(404,header);
            res.write(JSON.stringify({
                message: 'Username not Found'
            }));
            res.end();
            return;
        }
        var index_filtered = [];
        var coord_filtered = [];
        var fixed_uname = [];

        coord_filtered = await UserData.filterCoordinate();

        for (let index = 0,filter_iterator = 0; index < coord_filtered.username.length; index++) {
            const jarak_buffer = pythagoras(user.x_coord,user.y_coord,coord_filtered.x[index],coord_filtered.y[index]);
            if(jarak_buffer <= treshold){
                index_filtered[filter_iterator] = index;
                filter_iterator++;
            }
        }
        for (let index = 0; index < index_filtered.length; index++) {
            fixed_uname[index] = coord_filtered.username[index_filtered[index]];
            
        }

        res.writeHead(200,header);
        res.write(JSON.stringify(fixed_uname));
        res.end();
    } catch (e){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
};

const updateData = async (req,res,uname) => {
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

            getBodyData(req, async result => {
                const ret = await UserData.updateData(user_verified.username,JSON.parse(result));
                // console.log(ret);
                if(!ret){
                    res.writeHead(404,header);
                    res.write(JSON.stringify({
                        message: 'Update data failed'
                    }));
                    res.end();
                }
                res.writeHead(200,header);
                res.write(JSON.stringify(ret));
                res.end();
            })
        }
    } catch (e){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe invalid token??'
        }));
        res.end();
    }
};

const findByLevel = async (req,res,min_level,max_level) => {
    try {
        const users = await UserData.findByLevel(min_level,max_level);

        if(!users){
            res.writeHead(404,header);
            res.write(JSON.stringify({
                message: 'There is no users on that treshold'
            }));
            res.end();
            return;
        }

        // console.log(users);

        res.writeHead(200,header);
        res.write(JSON.stringify(users.map(res => res.username)));
        res.end();

    } catch (e){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
}

const findByInstrumentsBinary = async (req,res,instruments_binary) => {
    try {
        const user_datas = await UserData.getInstruments();
        // console.log(user_datas);

        var ret_buffer = [];
        // console.log(user_datas.username.length);
        for (let index = 0,ret_index = 0; index < user_datas.username.length; index++) {
            if(!user_datas.instruments[index]){
                continue;
            }
            if(await compare(instruments_binary,user_datas.instruments[index])==1){
                ret_buffer[ret_index] = user_datas.username[index];
                ret_index++;
            }
        }
        res.writeHead(200,header);
        res.write(JSON.stringify(ret_buffer));
        res.end();
    }catch(e){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
}

const findByInstruments = async (req,res,instruments) => {
    try {
        const user_datas = await UserData.getInstruments();
        
        const binary = await instrumentsToBinary(instruments);
        var ret_buffer = [];
        // console.log(JSON.stringify(binary));
        for (let index = 0,ret_index = 0; index < user_datas.username.length; index++) {
            if(!user_datas.instruments[index]){
                continue;
            }
            if(await compare(binary,user_datas.instruments[index])==1){
                ret_buffer[ret_index] = user_datas.username[index];
                ret_index++;
            }
        }
        res.writeHead(200,header);
        res.write(JSON.stringify(ret_buffer));
        res.end();

    }catch(e){
        res.writeHead(404,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
}
module.exports = {
    getUserInfo,
    findNearby,
    updateData,
    findByLevel,
    findByInstrumentsBinary,
    findByInstruments
};