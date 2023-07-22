const httpStatus = require('http-status'); 
const catchAsync = require('../utils/catchAsync');  
const fileUpload = require('express-fileupload');
const readCsvFromBuffer = require('../services/mails.service').readCsvFromBuffer
const importMails = catchAsync(async (req, res) => { 
// verify csv file 
if(req.files.data.name.slice(-3) !== "csv") {
return res.status(500).send({
    error:"invalid file!"
})
}

});
 

module.exports = {
    importMails
};
