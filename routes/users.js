const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');
const validator = require('../middlewares/validators/user');

// api/users
router.get('/:role_id', controller.getUsersByRole);
router.get('/guests/tables', controller.getGuests);
router.post('/:role_id', validator.userValidationRules(), validator.userValidate, controller.createUser);
router.put('/:user_id', validator.userUpdateValidationRules(), validator.userValidate, controller.updateUser);
router.delete('/:user_id', controller.removeUser);
router.put('/reserve/:user_id', controller.reserve);

module.exports = router;
