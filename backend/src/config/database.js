//Importa a biblioteca mongoose para conectar com o MongoDB
const mongoose = require('mongoose');

//Função que faz a conexão com o banco de dados
const connectDB = async () => {
    try{
        //Tenta conectar usando a URL que esta no arquivo .env
        await mongoose.connect(process.env.MONGODB_URI);

        //Se chegou aqui, funcionou!
        console.log('✅  MongoDB conectado com sucesso!');
    } catch (error){
        //Se deu erro, mostra o erro e encerra o programa
        console.error('❌ Erro ao conectar o MongoDB', error.message);
        process.exit(1); // 1 = encerrar com erro
    }
};

//Exportar a função para poder usar em outros arquivos 
module.exports = connectDB;