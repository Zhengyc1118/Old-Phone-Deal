var express = require('express')
var controller = require('../controllers/user.server.controller')
var router = express.Router();

router.get('/:id', controller.getUser);
router.get('/search/:email', controller.getUserByEmail);
router.get('/:email/:password', controller.validateUser);
router.get('/:firstname/:lastname/:email/:password', controller.addUser);
router.get('/edit-profile/:id/:firstname/:lastname/:email', controller.editProfile);
router.get('/change-password/:id/:newPassword', controller.changePassword);
router.get('/reset-password/:email/:newPassword', controller.resetPassword);

module.exports = router;