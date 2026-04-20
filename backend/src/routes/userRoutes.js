const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

// Todas as rotas abaixo exigem que o usuário esteja autenticado (verifyToken)
router.get('/', verifyToken, userController.getAll);
router.get('/:id', verifyToken, userController.getById);
router.post('/', verifyToken, userController.create);
router.put('/:id', verifyToken, userController.update);
router.delete('/:id', verifyToken, userController.delete);

module.exports = router;