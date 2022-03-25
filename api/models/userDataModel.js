const UserData = require('./userData');
const User = require('./userModel');

const findByUname = async (uname) => {
    const res = await UserData.findOne({username: uname});
    return res;
};

const getAllUserCoordinateX = async () => {
    const res_buffer = await UserData.find({});
    return res_buffer.map(res => res.x_coord);
};

const getAllUserCoordinateY = async () => {
    const res_buffer = await UserData.find({});
    return res_buffer.map(res => res.y_coord);
};

const getUsername = async () => {
    const res_buffer = await UserData.find({});
    return res_buffer.map(res => res.username);
};

const filterCoordinate = async (page = 0,limit = 20) => {
    const res_buffer = await UserData.find()
        .skip(page * limit)
        .limit(limit);
    var buffer = [];
    buffer.username = res_buffer.map(res => res.username);
    buffer.x = res_buffer.map(res => res.x_coord);
    buffer.y = res_buffer.map(res => res.y_coord);
    return buffer;
};

const createUserData = async (uname) => {
    const user_data_buffer = new UserData;
    user_data_buffer.username = uname;
    const saved_user_data = await user_data_buffer.save();
    if(!saved_user_data){
        return 0;
    }
    else {
        return 1;
    }
};

const updateData = async (uname,data) => {
    const ret = await UserData.findOneAndUpdate({username: uname},data,{
        new: true
    });
    // console.log(ret);
    // console.log(data.username);
    if(!data.username){
        // console.log("asuidasibuiusad");
        return ret;
    }
    else {
        var user_buffer = await User.findByUname(uname);
        if(!user_buffer){
            return false;
        }
        user_buffer.username = data.username;
        const ret2 = await user_buffer.save();
        // console.log(ret2);
    }

    return ret;
};

const findByLevel = async (min_treshold,max_treshold,page = 0,limit = 20) => {
    const buff = await UserData.find({
        skill_level: {
            $gte: min_treshold,
            $lte: max_treshold
        }
    }).skip(page * limit)
    .limit(limit);

    return buff;
}
const getInstruments = async (page = 0,limit = 20) => {
    var buffer = [];
    const res_buffer = await UserData.find({}).skip(page * limit).limit(limit);
    buffer.instruments = res_buffer.map(res => res.instruments);
    buffer.username = res_buffer.map(res => res.username);

    return buffer;
}
module.exports = {
    findByUname,
    createUserData,
    updateData,
    findByLevel,
    getAllUserCoordinateX,
    getAllUserCoordinateY,
    getUsername,
    filterCoordinate,
    getInstruments
};