const express = require('express');
const router = express.Router();

const controller = require('../controllers/roles');
const middleware = require('../middlewares/role');
const validator = require('../middlewares/validators/role');

// api/roles
router.get('/', controller.getRoles);
router.post('/', middleware.roleLimit, validator.roleValidationRules(), validator.roleValidate, middleware.roleRules, controller.createRole);
router.put('/:role_id', validator.roleValidationRules(), validator.roleValidate, middleware.roleRules, controller.updateRole);
router.delete('/:role_id', controller.removeRole);

module.exports = router;
