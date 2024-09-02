const fs = require('fs');
const express = require('express');
const bookController = require('../controller/bookController');

const router = express.Router();

router.route('/').get(bookController.renderBooks);

module.exports = router;
