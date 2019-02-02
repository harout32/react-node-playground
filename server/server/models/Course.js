// const mongoose = require('mongoose');
// const mongooseErrorHandler = require('mongoose-mongodb-errors');

// const courseSchema = mongoose.Schema({
//   description: String,
//   imageURL: String,
//   name: {
//     lowercase: true,
//     required: 'name is required',
//     trim: true,
//     type: String,
//     unique: 'the course name is already exist!!'

//   },
//   videos: [{
//     title:String,
//     lecture:String,
//     key:Number,
//     description:String,
//     imageURL:String,
//     videoURL:String,
//     comments:[{
//       text:{
//         type:String,
//         trim:true,
//         required:'fill the comment field to submit!!'
//       },
//       createdAt: {type:Date},
//       creator:{
//         _id:mongoose.Schema.ObjectId,
//         name:String,

//       }
//     }]
//   }]
// });

// courseSchema.plugin(mongooseErrorHandler);
// const Course = mongoose.model('Course',courseSchema);
// module.exports = {Course};