const User = require('./user');

const findByUname = async (uname) => {
    const res = await User.findOne({username: uname});
    return res;
}

module.exports = {
    findByUname
};