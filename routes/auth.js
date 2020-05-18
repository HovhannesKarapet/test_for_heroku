const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth');

router.post('/login', controller.login);
router.post('/logout_with_password', controller.logoutWithPassword);
router.post('/logout_without_password', controller.logoutWithoutPassword);
router.post('/token', controller.token);

module.exports = router;
