const express = require('express');

const permissionRouter = express.Router();
const { catchErrors } = require('../error handlers/errorHandler');

const { getPermissions } = require('../controllers/permissionController');

permissionRouter.get('/', catchErrors(getPermissions));
// permissionRouter.get('/UserPermissions', catchErrors(permissionRouter));

module.exports = permissionRouter;
