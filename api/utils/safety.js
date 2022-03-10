const User = require('../models/userModel');

const safetyCreateUser = async (user) => {
    const buffer = await User.findByUname(user.username);
    if(!buffer){
        return 1;
    }
    else {
        return 0;
    }
    
};

module.exports = {
    safetyCreateUser
};