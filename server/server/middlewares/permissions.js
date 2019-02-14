const { Role } = require('../models/Role');


exports.permissions = (allowedPermissions) => {
    return function (req, res, next) {
        return Role.findById(req.user.role._id)
            .populate('permissions')
            .then(role => {
                let allowed = false;
                if (!role) return Promise.reject();
                role.permissions.forEach(permission => {
                    if (allowedPermissions.includes(permission.name)) {
                        allowed = true;
                        return next();
                    }
                });
                if (!allowed) {
                    Promise.reject();
                }
            }).catch(err => {
                return res.status(401).send({ message: 'not allowed', status: 401 })
            })
    }
};
