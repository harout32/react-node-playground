const bycrept = require('bcrypt');
const pick = require('lodash/pick');

const { User } = require('../models/User');
const { Role } = require('../models/Role');


const isLogedIn = async (req, res, next) => {
  const token = req.header('token');
  const user = await User.findByToken(token);
  // passing the error that is going to be fetched from catchErrors();

  if (!user) return next({ message: 'not Authorized', status: 401 });
  return res.send(user);
};


/**
 * @param {string} userName
 * @param {string} password
 */
const login = async (req, res, next) => {
  const data = pick(req.body, ['userName', 'password']);
  const user = await User.findOne({ userName: data.userName }).populate(
    {
      path: 'role',
      select: '-_id -permissions -__v',
    }
  );
  if (!user) return next({ message: 'You\'r Credentials are not Correct!!', status: 401 });
  // compare hashed password with the plane text one
  const validPass = await bycrept.compare(data.password, user.password);
  if (!validPass) return next({ message: 'You\'r Credentials are not Correct!!', status: 401 });
  await user.generateToken();
  return res.status(200).send(user);
};

const logout = async (req, res, next) => {
  const { token } = req.headers;
  const user = await User.findByToken(token);
  if (!user) return next({ message: ' Not Authorized!!', status: 401 });
  user.token = null;
  await user.save();
  return res.status(200).send({ message: 'You are logged out!' });
};

const getUserPermissions = async (req, res, next) => {
  console.log('asdasdasdasdaaaaaaaaaaaa');
  const role = await Role.findById(req.user.role._id).populate(
    {
      path: 'permissions',
      select: '-_id',
    }
  );
  if (!role) return next({ message: 'no such a Role !!!', status: 400 });
  const permissions = role.permissions.map(per => per.name);
  return res.status(200).send(permissions);
};


module.exports = {
  logout,
  login,
  isLogedIn,
  getUserPermissions,
};
