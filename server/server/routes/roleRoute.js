const express = require('express');

const roleRouter = express.Router();

const {
  catchErrors,
} = require('../error handlers/errorHandler');

const { authentication } = require('../middlewares/authentication');
const { permissions } = require('../middlewares/permissions');
const {
  addRole,
  addPermission,
  getUserPermissions,
  getRoles,
} = require('../controllers/roleController');

const { permissionsEnum } = require('../Enums/PermissionsEnum');

// roleRouter.use(authentication);
// roleRouter.get('/', catchErrors(getRoles));
roleRouter.post('/', catchErrors(addRole));
// roleRouter.post('/PermissionToRole', catchErrors(addPermission));




// roleRouter.get('/UserPermissions', catchErrors(getUserPermissions));


module.exports = roleRouter;
