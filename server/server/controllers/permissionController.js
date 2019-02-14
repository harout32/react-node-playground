const { Permission } = require('../models/Permission');

const getPermissions = async (req, res, next) => {
  const permissions = await Permission.find();
  res.status(200).send(permissions);
};

const getUserPermissions = async (req, res, next) => {
  const role = await Role.findById(req.user.role._id).populate({
    path: 'permissions',
    select: '-_id'
  });
  if (!role) return next({ message: 'no such a Role !!!', status: 400 });
  const permissions = role.permissions.map(per => per.name);
  res.status(200).send(permissions);
};

module.exports = {
  getPermissions,
  getUserPermissions,
};
