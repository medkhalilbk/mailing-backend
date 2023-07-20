const httpStatus = require('http-status'); 
const catchAsync = require('../utils/catchAsync'); 
const readCsvFromRequest = require('../services/mails.service').readCsvFromRequest
const importMails = catchAsync(async (req, res) => {
 const {name} = req.body 
 console.log(name) 
 console.log(req.files)
});
 

module.exports = {
    importMails
};
