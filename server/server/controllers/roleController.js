const pick = require('lodash/pick');

const { Role } = require('../models/Role');


const { Permission } = require('../models/Permission');


const getRoles = async (req, res, next) =>{
    const roles = await Role.find().select('_id name');
    if(!roles) return next({message: 'no roles so far', status :200})
    res.status(200).send(roles);
}

const addRole = async (req, res, next) => {
  const data = pick(req.body, ['name']);
  data.permissions = [];
  console.log(data);
  let role;
  try {

    role = await (new Role(data)).save();
  } catch (e) {
    return next({ message: 'Role is already exist', status: 400 });
  }
  if (!role) return next({ message: 'Role is already exist', status: 400 });

  res.status(200).send(role);
}

const addPermission = async (req, res, next) => {
  const data = pick(req.body, ['permission', 'role']);

  const permission = await Permission.findOne({ name: data.permission });
  if (!permission) return next({ message: 'permission is not valid', status: 400 });

  const role = await Role.findOneAndUpdate(
    { name: data.role },
    { $addToSet: { permissions: permission._id } },
    { new: true, runValidators: true },
  ).populate('permissions');

  if (!role) return next({ message: 'couldn\'t find the role', status: 400 });

  res.status(200).send(role);
}

const getUserPermissions = async (req, res, next) => {

  const role = await Role.findById(req.user.role._id).populate(
    {
      path: 'permissions',
      select: '-_id',
    }
  );
  if (!role) return next({ message: 'no such a Role !!!', status: 400 });
  const permissions = role.permissions.map(per => per.name);
  res.status(200).send(permissions);
}

module.exports = {
  getUserPermissions,
  addPermission,
  addRole,
  getRoles,
}
