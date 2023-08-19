const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const clientModelSchema = mongoose.Schema({
  company: String,
  fullName: String,
  email: String,
  number: String,
  country: String,
  sector: String,
  date: {
    type: Date,
    default: Date.now  },
  userId: mongoose.Types.ObjectId,
});

// Apply plugins to the schema
clientModelSchema.plugin(toJSON);
clientModelSchema.plugin(paginate);

const clientModel = mongoose.model('client', clientModelSchema);

module.exports = clientModel;
