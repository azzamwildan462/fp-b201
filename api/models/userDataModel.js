const UserData = require('./userData');

const findByUname = async (uname) => {
    const res = await UserData.findOne({username: uname});
    return res;
}

const getAllUserCoordinate = async () => {
    const res_buffer = await UserData.find({});
    return res_buffer.map(res => res.x_coord);
}

module.exports = {
    findByUname
};