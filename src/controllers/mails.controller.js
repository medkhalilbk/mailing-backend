const httpStatus = require('http-status'); 
const catchAsync = require('../utils/catchAsync');  
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const MailModel = require('../models/mail.model');
const readCsvFromBuffer = require('../services/mails.service').readCsvFromBuffer
const fs = require('fs');
const { parse } = require('csv-parse');
const clientModel = require('../models/client.model'); 
const { mongoose } = require('mongoose');;
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
                    parse({ delimiter: "," }).on("data", async function (row) {
                            const verifyRow = row.join('');
                            if (!verifyRow.length) {
                              console.log('empty line');
                              return;
                            }
                        const userId = await new mongoose.Types.ObjectId(req.body.userId)
                        console.log(userId)
                        await clientModel.create({
                          company: row[0],
                          fullName: row[1],
                          phoneNumber: row[2],
                          email: row[3],
                          country: row[4],
                          sector: row[5],
                          userId: req.body.userId,
                        }); 
                     
                   })
                ))
                               await MailModel.create({
                                 userId: req.body.userId,
                                 path: uuidv4() + '.csv',
                                 name: req.body.name,
                                 fileSize: 0,
                               });
              return res.send({ status: 'success', name: uuidv4()+".csv" });
            });
        
    } catch (error) {
        console.log(error)
    }
});
const getMails = catchAsync(async (req, res) => {
    const mails = await clientModel.find(); 
    return res.send({message:mails})
} )

module.exports = {
    importMails, getMails
};
