// const mongoose = require('mongoose');
// const bcrypt   = require('bcrypt');
// //make bcrypt support promises
// bcrypt.Promise = global.Promise;

// const adminUserSchema = mongoose.Schema({
//   userName:{
//     type:String,
//     required:'userName is required !',
//     trim: true,
//     maxlength:12,
//     minlength:2,
//     unique:true,
//     lowercase: true
//   },
//   password:{
//     type:String,
//     required:'password is required !',
//   }
// });
// //hashing the password before 
// adminUserSchema.pre('save',async function(next){
//   if(!this.isModified('password')){
//     next();
//   }else{
//     try{
//       const salt           = await bcrypt.genSalt(+process.env.ADMIN_SALT);
//       const hashedPassword = await bcrypt.hash(this.password, salt);
//       this.password        = hashedPassword;
//       next();
//     }catch(error){
//       throw Error(error);
//     }
//   }
// });

// const AdminUser = mongoose.model('AdminUser',adminUserSchema);
// module.exports = {AdminUser};