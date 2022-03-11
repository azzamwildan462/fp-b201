const UserData = require('./userData');

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

const filterCoordinate = async () => {
    const res_buffer = await UserData.find({});
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
    return ret;
};

const findByLevel = async (min_treshold,max_treshold) => {
    const buff = await UserData.find({
        skill_level: {
            $gte: min_treshold,
            $lte: max_treshold
        }
    });

    return buff;
}
const getInstruments = async () => {
    var buffer = [];
    const res_buffer = await UserData.find({});
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