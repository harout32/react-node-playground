const express = require('express');

const authRouter = express.Router();
const { authentication } = require('../middlewares/authentication');
const { catchErrors, apiHandle, notFound } = require('../error handlers/errorHandler');
const {
  isLogedIn,
  // createUser,
  login,
  logout,
  getUserPermissions,
} = require('../controllers/authController');

authRouter.post('/login', catchErrors(login));
authRouter.post('/islogedin', authentication, catchErrors(isLogedIn));
// authRouter.post('/register', catchErrors(createUser));
authRouter.get('/logout', authentication, catchErrors(logout));
authRouter.get('/permission',authentication, catchErrors(getUserPermissions));

module.exports = authRouter;
