const express = require('express');
const router = express.Router();
const connection = require('../controllers/connection');

router.get('/', connection.initialconnection);

module.exports = router;