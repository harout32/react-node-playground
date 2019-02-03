const pick = require('lodash/pick');

const { User } = require('../models/User');
const { Role } = require('../models/Role');

const createUser = async (req, res, next) => {
  const data = pick(req.body, ['userName', 'password', 'email', 'role']);
  const role = await Role.findOne({ name: data.role });
  if (!role) return next({ status: 400, message: 'No Role' });
  data.role = role._id;

  const user = await new User(data).save();
  return res.send(user);
};
const getAllUsers = async (req, res, next) => {
  const limit = req.body.limit && req.body.limit < 500 ? req.body.limit : 30;
  const pageNumber = req.body.pageNumber > 0 ? req.body.pageNumber : 0;

  if (typeof limit !== 'number' || typeof pageNumber !== 'number') {
    return next({ status: 400, message: 'Wrong Parameters' });
  }
  const users = await User.find().populate('permission').limit(limit).skip(limit * pageNumber);
  return res.status(200).send(users);
};

const updateUserById = async (req, res, next) => {
  const userId = req.params.id;
  const userData = pick(req.body, ['userName', 'role', 'email']);
  const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { $set: userData }, { new: true });
  return res.status(updatedUser);
};
module.exports = {
  createUser,
  getAllUsers,
  updateUserById,

};
