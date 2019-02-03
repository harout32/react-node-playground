const express = require('express');

const api = express.Router();

const playersRouter = require('./playersRoute');
const roleRouter = require('./roleRoute');
const permissionRouter = require('./permissionRoute');
const usersRouter = require('./usersRoute');
// const {
//   apiHandle,
//   notFound,
// } = require('../error handlers/errorHandler');
const authRouter = require('./authRoute');

// api.post('/role', catchErrors(addRole));
// api.post('/permission', catchErrors(addPermission));

api.use('/auth', authRouter);
api.use('/players', playersRouter);
api.use('/role', roleRouter);
api.use('/permission', permissionRouter);
api.use('/users', usersRouter);


module.exports = api;
