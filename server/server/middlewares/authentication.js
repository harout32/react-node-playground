let {User} = require('../models/User');


exports.authentication = async (req, res, next) => {
    try{    
    let token = req.header('Authorization');
    const user = await User.findByToken(token);
    if(!user) return res.status(401).send({mesage: 'not allowed', status: 401});

    req.user = user;
    next();
    }catch(e) {
        return res.status(401).send({mesage: 'not allowed', status: 401, error: e});
    }
   
};
