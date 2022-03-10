const User = require('./user');
const bcrypt = require("bcrypt");

const findByUname = async (uname) => {
    const res = await User.findOne({username: uname});
    return res;
};

const createUser = async (user) => {
    const salt = await bcrypt.genSalt(11);
    user.password = await bcrypt.hash(user.password,salt);

    const buffer = new User(user);
    const saved_user = await buffer.save();
    // console.log(saved_user);
    if(!saved_user){
        return 0;
    }
    else {
        return 1;
    }
};

const deleteByUname = async (uname) => {
    const res = await User.deleteOne({username: uname});
    return res;
}

module.exports = {
    findByUname,
    createUser,
    deleteByUname
};