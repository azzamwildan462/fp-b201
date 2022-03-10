const UserData = require('./userData');

const findByUname = async (uname) => {
    const res = await UserData.findOne({username: uname});
    return res;
};

const getAllUserCoordinate = async () => {
    const res_buffer = await UserData.find({});
    return res_buffer.map(res => res.x_coord);
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

module.exports = {
    findByUname,
    createUserData,
    updateData
};