const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const clientModelSchema = mongoose.Schema({
  fullName: String,
    email: String,
    number: String,
    country: String
});

const clientModel = mongoose.model('client', clientModelSchema);

module.exports = clientModel;
