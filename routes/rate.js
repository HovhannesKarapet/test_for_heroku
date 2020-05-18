const express = require('express');
const router = express.Router();

const controller = require('../controllers/rate');

//api/rate
router.get('/', controller.getAllRates);
router.post('/', controller.rate);

module.exports = router;