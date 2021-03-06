const mongoose = require('mongoose');
const User = require('../models/userModel');
const UserData = require('../models/userDataModel');
const {header} = require('../utils/header');
const {binaryToInstruments,instrumentsToBinary,compare} = require('../utils/instrumentsDecoder');
const {getBodyData,
getHeader} = require('../utils/requestParser');
const {jwt_env, status_code} = require('../utils/yaml-parser');
const {safetyCreateUser,
safetyUserLogin} = require('../utils/safety');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {pythagoras} = require('../utils/math');

const getUserInfo = async (req,res,uname) => {
    try {
        const user = await User.findByUname(uname);
        if(!user){
            res.writeHead(status_code.NOT_FOUND,header);
            res.write(JSON.stringify({
                message: 'Username not Found'
            }));
            res.end();
        }
        else {
            const user_data = await UserData.findByUname(uname);

            if(!user_data.instruments){
                res.writeHead(status_code.NOT_FOUND,header);
                res.write(JSON.stringify({
                    message: 'This user has not update his data'
                }));
                res.end();
                return;
            }

            user_data.instruments = await binaryToInstruments(user_data.instruments);

            res.writeHead(status_code.OK,header);
            res.write(JSON.stringify(user_data));
            res.end();
        }
    } catch (e){
        res.writeHead(status_code.INTERNAL_SERVER_ERROR,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
};
const findNearby = async (req,res,uname,treshold,page = 0,limit = 20) => {
    try {
        const user = await UserData.findByUname(uname);
        if(!user){
            res.writeHead(status_code.NOT_FOUND,header);
            res.write(JSON.stringify({
                message: 'Username not Found'
            }));
            res.end();
            return;
        }
        var index_filtered = [];
        var coord_filtered = [];
        var fixed_uname = [];

        coord_filtered = await UserData.filterCoordinate(page,limit);

        for (let index = 0,filter_iterator = 0; index < coord_filtered.username.length; index++) {
            const jarak_buffer = pythagoras(user.x_coord,user.y_coord,coord_filtered.x[index],coord_filtered.y[index]);
            if(jarak_buffer <= treshold && user.username != coord_filtered.username[index]){
                index_filtered[filter_iterator] = index;
                filter_iterator++;
            }
        }
        for (let index = 0; index < index_filtered.length; index++) {
            fixed_uname[index] = coord_filtered.username[index_filtered[index]];
            
        }

        if(fixed_uname.length==0){
            res.writeHead(status_code.NOT_FOUND,header);
            res.write(JSON.stringify({
                message: 'There is no users on that treshold'
            }));
            res.end();
            return;
        }

        res.writeHead(status_code.OK,header);
        res.write(JSON.stringify(fixed_uname));
        res.end();
    } catch (e){
        res.writeHead(status_code.INTERNAL_SERVER_ERROR,header);
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
            res.writeHead(status_code.NOT_FOUND,header);
            res.write(JSON.stringify({
                message: 'Username not Found'
            }));
            res.end();
        }
        else {
            const authHeader = await getHeader(req, 'authorization');
            if(!authHeader){
                res.writeHead(status_code.UNAUTHORIZED,header);
                res.write(JSON.stringify({
                    message: 'Please login'
                }));
                res.end();
                return;
            }
            const authToken = authHeader.split(' ')[5];
            if(!authToken){
                res.writeHead(status_code.UNAUTHORIZED,header);
                res.write(JSON.stringify({
                    message: 'Do you login correctly?'
                }));
                res.end();
                return;
            }
            const user_verified = jwt.verify(authToken,jwt_env.secret_token);

            if(!user_verified){
                res.writeHead(status_code.UNAUTHORIZED,header);
                res.write(JSON.stringify({
                    message: 'You just doesnt register properly!'
                }));
                res.end();
                return;
            }

            getBodyData(req, async result => {
                const parsed = JSON.parse(result);
                // console.log(JSON.stringify(parsed.instruments)," -> ",JSON.stringify(JSON.stringify(parsed.instruments).split('"')[1].match(/[0-1]+$/g)).length-4, " ",JSON.stringify(parsed.instruments).length-2);
                if(JSON.stringify(JSON.stringify(parsed.instruments).split('"')[1].match(/[0-1]+$/g)).length - 4 != JSON.stringify(parsed.instruments).length - 2){
                    res.writeHead(status_code.BAD_REQUEST,header);
                    res.write(JSON.stringify({
                        message: 'Invalid Instruments format!'
                    }));
                    res.end();
                    return;
                }
                if(!parsed.contacts.whatsapp)
                {
                    //nothing
                }
                else 
                {
                    if(JSON.stringify(JSON.stringify(parsed.contacts.whatsapp).split('"')[1].match(/[0-9]+$/g)).length - 4 != JSON.stringify(parsed.contacts.whatsapp).length - 2 ){
                    res.writeHead(status_code.BAD_REQUEST,header);
                    res.write(JSON.stringify({
                        message: 'Invalid Whatsapp format!'
                    }));
                    res.end();
                    return;
                    }
                }
                if(!parsed.contacts.instagram)
                {
                    //nothing
                }
                else 
                {
                    if(JSON.stringify(JSON.stringify(parsed.contacts.instagram).split('"')[1].match(/[a-zA-Z0-9\_\-]+$/g)).length - 4 != JSON.stringify(parsed.contacts.instagram).length - 2 ){
                    res.writeHead(status_code.BAD_REQUEST,header);
                    res.write(JSON.stringify({
                        message: 'Invalid Instagram format!'
                    }));
                    res.end();
                    return;
                    }
                }
                if(!parsed.contacts.id_line)
                {
                    //nothing
                }
                else 
                {
                    if(JSON.stringify(JSON.stringify(parsed.contacts.id_line).split('"')[1].match(/[a-zA-Z0-9\_\-]+$/g)).length - 4 != JSON.stringify(parsed.contacts.id_line).length - 2 ){
                    res.writeHead(status_code.BAD_REQUEST,header);
                    res.write(JSON.stringify({
                        message: 'Invalid ID Line format!'
                    }));
                    res.end();
                    return;
                    }
                }
                if(!parsed.skill_level)
                {
                    //nothing
                }
                else 
                {
                    if(parsed.skill_level > 255 || parsed.skill_level < 0){
                        res.writeHead(status_code.BAD_REQUEST,header);
                        res.write(JSON.stringify({
                            message: 'Skill level must be at range 0 - 255'
                        }));
                        res.end();
                        return;
                    }
                    if(JSON.stringify(JSON.stringify(parsed.skill_level).split('"')[1].match(/[0-9]+$/g)).length - 4 != JSON.stringify(parsed.skill_level).length - 2 ){
                    res.writeHead(status_code.BAD_REQUEST,header);
                    res.write(JSON.stringify({
                        message: 'Invalid Skill Level format!'
                    }));
                    res.end();
                    return;
                    }
                }
                if(!parsed.x_coord)
                {
                    //nothing
                }
                else 
                {
                    if( isNaN(parsed.x_coord) ){
                    res.writeHead(status_code.BAD_REQUEST,header);
                    res.write(JSON.stringify({
                        message: 'Invalid X_Coord format!'
                    }));
                    res.end();
                    return;
                    }
                }
                if(!parsed.y_coord)
                {
                    //nothing
                }
                else 
                {
                    if( isNaN(parsed.y_coord) ){
                    res.writeHead(status_code.BAD_REQUEST,header);
                    res.write(JSON.stringify({
                        message: 'Invalid Y_Coord format!'
                    }));
                    res.end();
                    return;
                    }
                }
                if(!parsed.username)
                {
                    //nothing
                }
                else 
                {
                    if(JSON.stringify(JSON.stringify(parsed.username).split('"')[1].match(/[a-zA-Z0-9]+$/g)).length - 4 != JSON.stringify(parsed.username).length - 2 ){
                    res.writeHead(status_code.BAD_REQUEST,header);
                    res.write(JSON.stringify({
                        message: 'Invalid Username format!'
                    }));
                    res.end();
                    return;
                    }
                }

                const ret = await UserData.updateData(user_verified.username,parsed);
                if(!ret){
                    res.writeHead(status_code.UNAUTHORIZED,header);
                    res.write(JSON.stringify({
                        message: 'Update data failed, maybe username has changed?'
                    }));
                    res.end();
                    return;
                }
                res.writeHead(status_code.OK,header);
                res.write(JSON.stringify(ret));
                res.end();
            })
        }
    } catch (e){
        res.writeHead(status_code.INTERNAL_SERVER_ERROR,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe invalid token??'
        }));
        res.end();
    }
};

const findByLevel = async (req,res,min_level,max_level,page = 0, limit = 20) => {
    try {
        if(min_level>max_level){
            res.writeHead(status_code.BAD_REQUEST,header);
            res.write(JSON.stringify({
                message: 'min_level must lower than max_level'
            }));
            res.end();
            return;
        }
        if(min_level < 0 || max_level > 255){
            res.writeHead(status_code.BAD_REQUEST,header);
            res.write(JSON.stringify({
                message: 'min_level and max level must be at 0 - 255'
            }));
            res.end();
            return;
        }

        const users = await UserData.findByLevel(min_level,max_level,page,limit);

        if(!users){
            res.writeHead(status_code.NOT_FOUND,header);
            res.write(JSON.stringify({
                message: 'There is no users on that treshold'
            }));
            res.end();
            return;
        }

        
        if(users.map(res => res.username).length==0){
            res.writeHead(status_code.NOT_FOUND,header);
            res.write(JSON.stringify({
                message: 'There is no users on that treshold'
            }));
            res.end();
            return;
        }

        res.writeHead(status_code.OK,header);
        res.write(JSON.stringify(users.map(res => res.username)));
        res.end();

    } catch (e){
        res.writeHead(status_code.INTERNAL_SERVER_ERROR,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
}

const findByInstrumentsBinary = async (req,res,instruments_binary,page = 0,limit = 20) => {
    try {
        const user_datas = await UserData.getInstruments(page,limit);

        var ret_buffer = [];
        for (let index = 0,ret_index = 0; index < user_datas.username.length; index++) {
            if(!user_datas.instruments[index]){
                continue;
            }
            if(await compare(instruments_binary,user_datas.instruments[index])==1){
                ret_buffer[ret_index] = user_datas.username[index];
                ret_index++;
            }
        }

        if(ret_buffer.length == 0){
            res.writeHead(status_code.NOT_FOUND,header);
            res.write(JSON.stringify({
                message: 'There is no one that can play that instruments'
            }));
            res.end();
            return;
        }

        res.writeHead(status_code.OK,header);
        res.write(JSON.stringify(ret_buffer));
        res.end();
    }catch(e){
        res.writeHead(status_code.INTERNAL_SERVER_ERROR,header);
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
        for (let index = 0,ret_index = 0; index < user_datas.username.length; index++) {
            if(!user_datas.instruments[index]){
                continue;
            }
            if(await compare(binary,user_datas.instruments[index])==1){
                ret_buffer[ret_index] = user_datas.username[index];
                ret_index++;
            }
        }

        if(ret_buffer.length == 0){
            res.writeHead(status_code.NOT_FOUND,header);
            res.write(JSON.stringify({
                message: 'There is no one that can play that instruments'
            }));
            res.end();
            return;
        }

        res.writeHead(status_code.OK,header);
        res.write(JSON.stringify(ret_buffer));
        res.end();

    }catch(e){
        res.writeHead(status_code.INTERNAL_SERVER_ERROR,header);
        res.write(JSON.stringify({
            message: 'There is an error, maybe??'
        }));
        res.end();
    }
}
const findWithManyParams = async (req,res,uname,treshold,instruments_binary,min_level,max_level,binary = 1)=> {
    try{
        const ret_all = [];

        //Nearby
        const user = await UserData.findByUname(uname);
        if(!user){
            res.writeHead(status_code.NOT_FOUND,header);
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
            if(jarak_buffer <= treshold && user.username != coord_filtered.username[index]){
                index_filtered[filter_iterator] = index;
                filter_iterator++;
            }
        }
        for (let index = 0; index < index_filtered.length; index++) {
            fixed_uname[index] = coord_filtered.username[index_filtered[index]];
            
        }

        if(binary==1)
        {
            //Instruments by binary
            const user_datas = await UserData.getInstruments();
            var ret_buffer = [];
            for (let index = 0,ret_index = 0; index < user_datas.username.length; index++) {
                if(!user_datas.instruments[index]){user.username != coord_filtered.username[index]
                    continue;
                }
                if(await compare(instruments_binary,user_datas.instruments[index])==1){
                    ret_buffer[ret_index] = user_datas.username[index];
                    ret_index++;
                }
            }
            if(ret_buffer.length == 0){
                res.writeHead(status_code.NOT_FOUND,header);
                res.write(JSON.stringify({
                    message: 'There is no one that can play that instruments'
                }));
                res.end();
                return;
            }
        }
        else {
            const user_datas = await UserData.getInstruments();
        
            const binary = await instrumentsToBinary(instruments_binary);
            // console.log("qweqweqw", binary); 
            var ret_buffer = [];
            for (let index = 0,ret_index = 0; index < user_datas.username.length; index++) {
                if(!user_datas.instruments[index]){
                    continue;
                }
                if(await compare(binary,user_datas.instruments[index])==1){
                    ret_buffer[ret_index] = user_datas.username[index];
                    ret_index++;
                }
            }

            if(ret_buffer.length == 0){
                res.writeHead(status_code.NOT_FOUND,header);
                res.write(JSON.stringify({
                    message: 'There is no one that can play that instruments'
                }));
                res.end();
                return;
            }
        }
        
        //Level
        const users = await UserData.findByLevel(min_level,max_level);

        if(!users){
            res.writeHead(status_code.NOT_FOUND,header);
            res.write(JSON.stringify({
                message: 'There is no users on that treshold'
            }));
            res.end();
            return;
        }
        ret_all[0] = fixed_uname;
        ret_all[1] = ret_buffer;
        ret_all[2] = users.map(res => res.username);

        res.writeHead(status_code.OK,header);
        res.write(JSON.stringify(ret_all));
        res.end();

    }catch(e){
        res.writeHead(status_code.INTERNAL_SERVER_ERROR,header);
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
    findByInstruments,
    findWithManyParams
};