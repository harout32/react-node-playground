const { Course }  = require('../models/Course');
const { AdminUser } = require('../models/AdminUser');
const pick      = require('lodash/pick');
const bcrypt      = require('bcrypt');

exports.addCourse = async (req, res) => {
  const data        = req.body;
  const course      = new Course(data);
  const savedCourse = await course.save();
    res.json(savedCourse);
}

exports.getLogin = (req, res) => {
  res.render('login',{title:'Login Page'});
}

exports.postLogin = async(req, res, next) => {
  const data = pick(req.body,['userName','password']);
  const user = await AdminUser.findOne({userName:data.userName});
  const validPass = await bcrypt.compare(data.password, user.password);
  if(!validPass) return next({message:'your credantials aren\'t right !!',status:401});
  res.json(pick(user,['userName','_id']))
}

exports.registerAdmin = async (req, res)=>{
  const admin = new AdminUser(req.body);
  const saved = await admin.save();
  res.send('yeahhh');
}