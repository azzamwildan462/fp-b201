const User = require('./user');

const findByUname = async (uname) => {
    const res = await User.findOne({username: uname});
    return res;
};

const createUser = async (user) => {
    const buffer = new User(user);
    const saved_user = await buffer.save();
    console.log(saved_user);
    if(!saved_user){
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