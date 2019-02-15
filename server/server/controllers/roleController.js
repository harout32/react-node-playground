const mongoose = require('mongoose');
const pick = require('lodash/pick');

const { Role } = require('../models/Role');

const { Permission } = require('../models/Permission');

const getRoles = async (req, res, next) => {
  const roles = await Role.find()
    .select('_id name permissions')
    .populate('permissions');
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
  if (!Array.isArray(req.body)) next({ message: 'wrong parameters', status: 422 });
  const permissions = [...req.body];
  const roleId = req.params.id;

  // const permission = await Permission.findOne({ name: data.permission });
  // if (!permission) return next({ message: 'permission is not valid', status: 400 });

  const role = await Role.findOneAndUpdate(
    { _id: roleId },
    { $addToSet: { permissions: { $each: permissions } } },
    { new: true, runValidators: true },
  ).populate('permissions');

  if (!role) return next({ message: "couldn't find the role", status: 400 });

  return res.status(200).send(role);
};
const getRolePermission = async (req, res, next) => {
  const roleId = req.params.id;
  const permissions = await Role.findById(roleId).populate('permissions');
  return res.status(200).send(permissions);
};

const deleteRole = async (req, res, next) => {
  const roleId = req.params.id;
  await Role.findByIdAndRemove(roleId);
  res.status(200).send();
};
const deleteRolePermission = async (req, res, next) => {
  if (!Array.isArray(req.body)) next({ message: 'wrong parameters', status: 422 });
  // const permissionsToRemove = req.body.map(id => mongoose.Types.ObjectId(id));
  const roleId = req.params.id;
  const updatedRole = await Role.findOneAndUpdate(
    { _id: roleId },
    { $pullAll: { permissions: [...req.body] } },
    { new: true, runValidators: true },
  ).populate('permissions');
  return res.status(200).send(updatedRole);
};

module.exports = {
  addRolePermission,
  addRole,
  getRoles,
  getRolePermission,
  deleteRole,
  deleteRolePermission,
};
