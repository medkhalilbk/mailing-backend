const httpStatus = require('http-status'); 
const catchAsync = require('../utils/catchAsync');  
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const MailModel = require('../models/mail.model'); 
const fs = require('fs');
const { parse } = require('csv-parse');
const clientModel = require('../models/client.model'); 
const { mongoose } = require('mongoose');const { validateEmail, validateNumber } = require('../services/clients.service');
; 
const sendEmail = require('../services/mails.service').sendEmail
const importMails = catchAsync(async (req, res) => {
     if (req.files.mailFile.name.slice(-3) !== "csv") {
        return res.status(500).send({
            error: "invalid file!"
        })
    }

    try {
            const file = req.files.mailFile;
            const path = __dirname + '/../files/' + uuidv4() + ".csv";
            file.mv(path, async (err) => {
              if (err) {
                  res.status(500).send(err);
                  console.log(err);
              } 

                fs.createReadStream(path).pipe((
                    parse({ delimiter: "," , relaxQuotes:true  }).on("data", async function (row) {
                        
                              const verifyRow = row.join('');
                              if (!verifyRow.length) {
                                console.log('empty line');
                                return;
                              }
                              if (!validateEmail(row[3])) {
                                throw new Error(row[3] + 'has invalid mail format!');
                              }
                              if (!validateNumber(row[2])) {
                                throw new Error(row[2] + 'is invalid number format!');
                              }
                              if (!row[0] || !row[1] || !row[2] || !row[3] || !row[4] || !userId) {
                                throw new Error('Error in some fields');
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
                ))
                               await MailModel.create({
                                 userId: res.locals.userId,
                                 path: uuidv4() + '.csv',
                                 name: req.body.name,
                                 fileSize: 0,
                               });
              return res.send({ status: 'success', name: uuidv4()+".csv" });
            });
        
    } catch (error) {
       return res.status(500).send({ status: 'error', message: error.message });
    }
});
const getMails = catchAsync(async (req, res) => { 
    const mails = await clientModel.find({ userId: res.locals.userId }).sort({ date: -1 }); 
    return res.send({message:mails})
})
const deleteClient = catchAsync(async (req, res) => {
  const client = await clientModel.deleteOne({ userId: res.locals.userId, _id:req.params.id });
  return res.send({ message: client });
});

const updateClient = catchAsync(async (req, res) => {
  try {  
  const client = await clientModel.updateOne({ _id: req.params.id }, req.body);  
   return res.send({ message: client });
  } catch (error) {
    console.log(error)
  }
});


const sendEmailController = catchAsync(async (req, res) => {
  try {
    const sendMail = await sendEmail(req.body.to, 'support@coffeecart.trading' ,"Test Mailing plateform"  , "<b> Test 1 </b>");
    return res.send({ message: sendMail });
  } catch (error) {
    console.log(error);
  }
});



module.exports = {
  importMails,
  getMails,
  sendEmailController, 
  deleteClient,
  updateClient,
};
