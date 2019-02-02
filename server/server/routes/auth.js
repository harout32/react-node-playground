const express = require('express');

const authRouter = express.Router();
const { catchErrors, apiHandle, notFound } = require('../error handlers/errorHandler');

const {
  isLogedIn,
  createUser,
  login,
  logout,
} = require('../controllers/authController');

authRouter.post('/islogedin', catchErrors(isLogedIn));
authRouter.post('/register', catchErrors(createUser));
authRouter.post('/login', catchErrors(login));
authRouter.get('/logout', catchErrors(logout));

module.exports = authRouter;
