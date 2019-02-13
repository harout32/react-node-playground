const mongoose = require('mongoose');

const { rolesEnums } = require('../Enums/RolesEnum');

const roleSchema = mongoose.Schema({
  name: {
    enum: rolesEnums,
    unique: true,
    type: String,
    require: true,
    trim: true,
    maxLength: [15, 'length should be less that 15 charachters'],
    minLength: [2, 'length should be more that 2 charachters'],
    match: [/[A-Za-z]/, 'Role should be only letters']
  },
  permissions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Permission',
    },
  ],
});

const Role = mongoose.model('Role', roleSchema);

module.exports = { Role };
