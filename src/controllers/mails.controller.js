const httpStatus = require('http-status'); 
const catchAsync = require('../utils/catchAsync');  
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const MailModel = require('../models/mail.model');
const readCsvFromBuffer = require('../services/mails.service').readCsvFromBuffer
const fs = require('fs');
const { parse } = require('csv-parse');
const clientModel = require('../models/client.model');
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
               await MailModel.create({
                 userId: 'test',
                 path: uuidv4() + '.csv', 
                 name:req.body.name
               });
                fs.createReadStream(path).pipe((
                    parse({ delimiter: "," }).on("data", function (row) {
                        clientModel.create({
                            fullName: row[0], email: row[1], number: row[2] , country:row[3]
                    }) 
                   })
               ))
              return res.send({ status: 'success', name: uuidv4()+".csv" });
            });
        
    } catch (error) {
        console.log(error)
    }
});
const getMails = catchAsync(async (req, res) => {
    console.log(req.body)
} )

module.exports = {
    importMails, getMails
};
