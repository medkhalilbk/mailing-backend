const express = require('express');
const auth = require('../../middlewares/auth'); 
const importMailsController = require('../../controllers/mails.controller').importMails;
const getMails = require('../../controllers/mails.controller').getMails;
const deleteMail = require('../../controllers/mails.controller').deleteClient
const updateClient = require('../../controllers/mails.controller').updateClient
const router = express.Router(); 
router.route('/import').post(auth('manageUsers'), importMailsController)
router.route('/:id').delete(auth('manageUsers'), deleteMail);
router.route('/:id').put(auth('manageUsers'), updateClient);
router.route('/').get(auth('manageUsers'), getMails)
module.exports = router;
 