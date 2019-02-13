const pick = require('lodash/pick');

const { Role } = require('../models/Role');

const { Permission } = require('../models/Permission');

const getRoles = async (req, res, next) => {
  const roles = await Role.find().select('_id name permissions').populate('permissions');
  if (!roles) return next({ message: 'no roles so far', status: 200 });
  res.status(200).send(roles);
};

const addRole = async (req, res, next) => {
  const data = pick(req.body, ['name']);
  data.permissions = [];
  console.log(data);
  let role;
  try {
    role = await new Role(data).save();
  } catch (e) {
    return next({ message: 'Role is already exist', status: 400 });
  }
  if (!role) return next({ message: 'Role is already exist', status: 400 });

  res.status(200).send(role);
};

const addRolePermission = async (req, res, next) => {
  const data = pick(req.body, ['permission', 'role']);

  const permission = await Permission.findOne({ name: data.permission });
  if (!permission) return next({ message: 'permission is not valid', status: 400 });

  const role = await Role.findOneAndUpdate(
    { name: data.role },
    { $addToSet: { permissions: permission._id } },
    { new: true, runValidators: true },
  ).populate('permissions');

  if (!role) return next({ message: "couldn't find the role", status: 400 });

  res.status(200).send(role);
};
const getRolePermission = async (req, res, next) => {
  const roleId = req.params.id;
  const permissions = await Role.findById(roleId).populate('permissions');
  res.status(200).send(permissions);
};

const deleteRole = async (req, res, next) => {
  const roleId = req.params.id;
  await Role.findByIdAndRemove(roleId);
  res.status(200).send();
};
const deleteRolePermission = async (req, res, next) => {
  if (!Array.isArray(req.body)) next({ message: 'wrong parameters', status: 422 });
  const roleId = req.params.id;
  await Role.findOneAndUpdate(
    { _id: roleId },
    { $pullAll: { permissions: req.body } },
    { new: true, runValidators: true },
  );
};

module.exports = {
  addRolePermission,
  addRole,
  getRoles,
  getRolePermission,
  deleteRole,
  deleteRolePermission,
};
