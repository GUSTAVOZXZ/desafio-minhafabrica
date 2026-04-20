const mongoose = require('mongoose');

//Define a estrutura de um Usuário no banco de dados
const userSchema = new mongoose.Schema(
    {
        //Campo nome: texto, obrigatório
        name: {
            type: String,
            required: [true, 'Nome Obrigatório'],
            trim: true, //remove espaços extras no começo/fim
        },

        //Campo email: texto, obrigatório, único (não pode se repetir)
        email: {
            type: String,
            required: [true, 'E-mail é obrigatório'],
            unique: true,
            lowercase: true, //salva sempre em minúsculas
            trim: true,
        },

        //Campo senha: texto, obrigatório
        password: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
    },
    {
        //timestamps: true => cria automaticamente os campos createdAt e updatedAt
        timestamps: true,
    }
);

//Cria e exporta o Model chamado 'user' baseado no schema acima.
module.exports = mongoose.model('User', userSchema);