const express = require('express');
const auth = require('../../middlewares/auth');  
const router = express.Router();  
const fileController = require('../../controllers/files.controller').getFilesById
router.route('/').get(auth('manageUsers'), fileController);
module.exports = router;

 