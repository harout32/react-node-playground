const { User } = require('../models/User');

exports.authentication = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    const user = await User.findByToken(token);
    if (!user) return res.status(403).send({ mesage: 'not allowed', status: 403 });
    req.user = user;
    return next();
  } catch (e) {
    return res
      .status(403)
      .send({ mesage: 'not allowed', status: 403, error: e });
  }
};
