const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt    = require('bcrypt');
const jwt = require('jsonwebtoken');
const pick = require('lodash/pick');

bcrypt.Promise  = global.Promise;

const userSchema = mongoose.Schema({
  userName:{
    type: String,
    trim:true,
    required: 'userName is required',
    unique: true,
    match: [/^[a-z][a-z0-9.\-_]+$/s, 'userName is Invalid!!']
  },
  email: {
    type: String,
    trim: true,
    required: ' email is required',
    unique: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: 'you should supply a real email'
    }
  },
  password: {
    type:String,
    required: 'password is required'
  },
  token:{
    type:String
  },
  role: {
    type: mongoose.Schema.ObjectId,
    ref: 'Role',
    required: 'Role is Required'
  }
});

//over writing the toJSON method wheneEver user is returned from DB
// in order to not in mistake return the sensetive data 
userSchema.methods.toJSON = function(){
  let userObject = this.toObject();
  return pick(userObject, ['_id','userName', 'email', 'token', 'role']);
}

//hashing the password before saving it 
userSchema.pre('save', async function(next){

 if(!this.isModified('password')) return next();
  try{
    const salt           = await bcrypt.genSalt(+process.env.USER_SALT);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password        = hashedPassword;
    next();
  }catch(error){
    //error is going to be fetched by the catchErrors()
    throw Error(error);
  }
});

//generating token for the user
userSchema.methods.generateToken = async function (){

const token = jwt.sign({_id: this._id.toHexString()}, process.env.USER_SECRET).toString();
this.token = token;
await this.save();
return token;
};

//fetching user by token 
userSchema.statics.findByToken = function(token){
  let decoded;
  try{
    decoded = jwt.verify(token, process.env.USER_SECRET);
  }catch(e){
    return null;
  }
  //await the process on call
  return this.findOne({
    _id:decoded._id,
    token
  });
}

const User = mongoose.model('User', userSchema);
module.exports = {User};