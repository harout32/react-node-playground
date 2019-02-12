const admin = require('express').Router();
// const admin   = express.Router();
const path    = require('path');
const helpers = require('../../helpers');
const {catchErrors, apiHandle, notFound} = require('../error handlers/errorHandler');

const {
  addCourse,
  getLogin,
  postLogin,
  registerAdmin
  } = require('../controllers/adminControllers');

admin.use((req, res, next) => {
  res.locals.h = helpers;
  res.harout = 'yeahhhhhhh';
  next();
})
admin.get('/', (req, res) => {
  res.redirect('/admin/login');
});
//catchErrors any petential errors and call next on it
admin.get('/login', getLogin);
admin.post('/login', catchErrors(postLogin));
admin.post('/register', catchErrors(registerAdmin));
admin.post('/add/course', catchErrors(addCourse));
//handling the errors
admin.use(notFound);
admin.use(apiHandle);

module.exports = admin;