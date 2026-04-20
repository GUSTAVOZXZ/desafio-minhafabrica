// Carrega as variáveis do arquivo .env ANTES de qualquer outra coisa
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Importa todas as rotas
const authRoutes = require('./routes/authRoutes');
const seedRoutes = require('./routes/seedRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

// Cria a aplicação Express
const app = express();

// Conecta ao banco de dados MongoDB
connectDB();

// ───────── Middlewares globais ─────────
// cors() → permite requisições de outros domínios (como o frontend em localhost:3000)
app.use(cors());

// express.json() → entende o corpo das requisições no formato JSON
app.use(express.json());

// ───────── Rotas ─────────
// Cada grupo de rotas tem um prefixo
app.use('/api/v1/auth', authRoutes);   // login
app.use('/api/v1/auth', seedRoutes);   // seed (admin inicial)
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// ───────── Middleware de erros (sempre por último!) ─────────
app.use(errorMiddleware);

// Inicia o servidor na porta definida no .env (ou 5000 como padrão)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});