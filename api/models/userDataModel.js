const UserData = require('./userData');

const findByUname = async (uname) => {
    const res = await UserData.findOne({username: uname});
    return res;
};

const getAllUserCoordinate = async () => {
    const res_buffer = await UserData.find({});
    return res_buffer.map(res => res.x_coord);
};

const createUser = async (user_data) => {
    const buffer = new User(user_data);
    const saved_user_data = await buffer.save();
    // console.log(saved_user_data);
    if(!saved_user_data){
        return 0;
    }
    else {
        return 1;
    }
};

module.exports = {
    findByUname,
    createUser
};