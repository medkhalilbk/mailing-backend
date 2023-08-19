const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const mailingController = require('../../controllers/mails.controller').sendEmailController
router.route('/').post((auth('manageUsers'), mailingController));
 
   
module.exports = router;
 