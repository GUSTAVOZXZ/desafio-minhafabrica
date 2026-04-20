const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/v1/auth/login → chama o método login do authController
router.post('/login', authController.login);

module.exports = router;