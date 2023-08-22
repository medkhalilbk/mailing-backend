const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const MailModel = require('../models/mail.model');
const fs = require('fs');
const { parse } = require('csv-parse');
const clientModel = require('../models/client.model');
const { mongoose } = require('mongoose');
const { validateEmail, validateNumber } = require('../services/clients.service');

const sendEmail = require('../services/mails.service').sendEmail;
const importMails = catchAsync(async (req, res) => {
  if (req.files.mailFile.name.slice(-3) !== 'csv') {
    return res.status(500).send({
      error: 'invalid file!',
    });
  }

  try {
    const file = req.files.mailFile;
    const path = __dirname + '/../files/' + uuidv4() + '.csv';
    let isValid = true;
    file.mv(path, async (err) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      }

      fs.createReadStream(path).pipe(
        parse({ delimiter: ',', relaxQuotes: true }).on('data', async function (row) {
          const verifyRow = row.join('');
          if (!verifyRow.length) {
            return;
          }

          await clientModel.create({
            company: row[0],
            fullName: row[1],
            number: row[2],
            email: row[3],
            country: row[4],
            sector: row[5],
            userId: res.locals.userId,
          });
        })
      );
      await MailModel.create({
        userId: res.locals.userId,
        path: uuidv4() + '.csv',
        name: req.body.name,
        fileSize: 0,
      });
      return res.send({ status: 'success', name: uuidv4() + '.csv' });
    });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
});
const getMails = catchAsync(async (req, res) => {
  const mails = await clientModel.find({ userId: res.locals.userId }).sort({ date: -1 });
  return res.send({ message: mails });
});
const deleteClient = catchAsync(async (req, res) => {
  const client = await clientModel.deleteOne({ userId: res.locals.userId, _id: req.params.id });
  return res.send({ message: client });
});

const updateClient = catchAsync(async (req, res) => {
  try {
    const client = await clientModel.updateOne({ _id: req.params.id }, req.body);
    return res.send({ message: client });
  } catch (error) {
    console.log(error);
  }
});

const sendEmailController = catchAsync(async (req, res) => {
  try { 
    if (req.body.to.length == 0) {
      return res.status(500).send({ message: 'mailist is not defined' });
    }
const emailPromises = req.body.to.map((to) => {
  return sendEmail(to, 'support@coffeecart.trading', 'Test Mailing platform', req.body.mailBody);
});
    const results = await Promise.all(emailPromises);
    return res.send({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});
const addClient = catchAsync(async (req, res) => {
  try {
    const { company, fullName, number, email, conutry, sector } = req.body
    if (!company || !fullName || !number || !email || !sector) {
      return res.status(500).send({ message: "error client is empty!" })
    }
    const clientObj = {...req.body,userId:res.locals.userId}
    const addToDb = await clientModel.create(clientObj);
    return res.send({message:"client added!"})
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


module.exports = {
  importMails,
  getMails,
  sendEmailController,
  deleteClient,
  updateClient,
  addClient
};
