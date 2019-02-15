const express = require('express');

const roleRouter = express.Router();

const {
  catchErrors,
} = require('../error handlers/errorHandler');

const { authentication } = require('../middlewares/authentication');
const { permissions } = require('../middlewares/permissions');
const {
  addRole,
  addRolePermission,
  getRoles,
  getRolePermission,
  deleteRole,
  deleteRolePermission,
} = require('../controllers/roleController');

const { permissionsEnum } = require('../Enums/PermissionsEnum');

roleRouter.use(authentication);
roleRouter.get('/', catchErrors(getRoles));
roleRouter.post('/', catchErrors(addRole));
roleRouter.put('/:id', catchErrors(deleteRole));
roleRouter.get('/:id/permission', catchErrors(getRolePermission));
roleRouter.post('/:id/permission', catchErrors(addRolePermission));
roleRouter.put('/:id/permission', catchErrors(deleteRolePermission));

// roleRouter.get('/UserPermissions', catchErrors(getUserPermissions));


module.exports = roleRouter;
