const User = require('./user');

const findByUname = async (uname) => {
    const res = await User.findOne({username: uname});
    return res;
}

const getAllUserCoordinate = async () => {
    const res_buffer = await User.find({});
    return res_buffer.map(res => res.x_coord);
}

module.exports = {
    findByUname
};