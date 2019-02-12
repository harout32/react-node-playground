const express = require('express');

const usersRouter = express.Router();
const { createUser, updateUserById, getAllUsers } = require('../controllers/usersControllers');
const { catchErrors } = require('../error handlers/errorHandler');
const { superAdmin } = require('../middlewares/superAdmin');

usersRouter.use(superAdmin);
usersRouter.get('/', catchErrors(getAllUsers));
usersRouter.post('/', catchErrors(createUser));
usersRouter.put('/:id', catchErrors(updateUserById));


module.exports = usersRouter;
