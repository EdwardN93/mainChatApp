const fs = require('fs');
const express = require('express');
const chatController = require('../controller/chatController');

const router = express.Router();

router.route('/').get(chatController.getAllChat).post(chatController.postChat);

module.exports = router;
