const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		sureName: {
			type: String,
			required: true,
			trim: true
		},
		possition: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			trim: true,
			required: ' email is required',
			validate: {
				isAsync: true,
				validator: validator.isEmail,
				message: 'you should supply a real email'
			}
		},
		creator: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: 'creator is Required'
		},
		age: {
			type: Number,
			required: 'age is required'
		}
	},
	{
		timestamps: true
	}
);
const Player = mongoose.model('Player', userSchema);
module.exports = { Player };
