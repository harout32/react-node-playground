const express = require('express');

const api = express.Router();

const playersRouter = require('./players');
const roleRouter = require('./role');

const {
  apiHandle,
  notFound,
} = require('../error handlers/errorHandler');
const authRouter = require('../routes/auth');

// api.post('/role', catchErrors(addRole));
// api.post('/permission', catchErrors(addPermission));

api.use('/auth', authRouter);
api.use('/players', playersRouter);
api.use('/role', roleRouter);


module.exports = api;
