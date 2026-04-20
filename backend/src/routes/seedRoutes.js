const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { hashPassword } = require('../utils/hashPassword');

// POST /api/v1/auth/seed → cria o usuário admin inicial
router.post('/seed', async (req, res) => {
  try {
    // Verifica se já existe um admin para não criar duplicado
    const existing = await User.findOne({ email: 'admin@minhafabrica.com' });
    if (existing) {
      return res.status(200).json({ message: 'Admin já existe!' });
    }

    const hashed = await hashPassword('senha123');

    await User.create({
      name: 'Administrador',
      email: 'admin@minhafabrica.com',
      password: hashed,
      role: 'admin',
    });

    res.status(201).json({ message: 'Admin criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;