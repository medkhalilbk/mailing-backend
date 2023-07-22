const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const MailSchema = mongoose.Schema({
  userId: String,
  path: String,
  name: String,
  time: { type: Date, default: Date.now },
});

 
 
const MailModel = mongoose.model('Mail', MailSchema);

module.exports = MailModel;
