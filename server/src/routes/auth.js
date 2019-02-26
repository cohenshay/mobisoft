const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/signIn', authController.signIn);

router.post('/login', authController.login);
 
router.post('/verify', authController.verify);

module.exports = router;