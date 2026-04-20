const mongoose = require('mongoose');

// Define a estrutura de um Produto no banco de dados
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome do produto é obrigatório'],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: '', // se não informar, salva string vazia
    },

    // Preço: número decimal, obrigatório, mínimo 0
    price: {
      type: Number,
      required: [true, 'Preço é obrigatório'],
      min: [0, 'Preço não pode ser negativo'],
    },

    // Estoque: número inteiro, obrigatório, mínimo 0
    stock: {
      type: Number,
      required: [true, 'Estoque é obrigatório'],
      min: [0, 'Estoque não pode ser negativo'],
      default: 0,
    },

    category: {
      type: String,
      trim: true,
      default: 'Geral',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);