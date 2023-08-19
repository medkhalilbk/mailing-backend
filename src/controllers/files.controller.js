const userModel = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const mailModel = require('../models/mail.model');
const getFilesById = async (req, res) => {
  try {
    const files = await mailModel.find({ userId: res.locals.userId });
    return res.send({ message: files });
  } catch (error) {
    console.log(error);
    return res.code(501).send({ message: 'error fetching' });
  }
};

module.exports = { getFilesById };
