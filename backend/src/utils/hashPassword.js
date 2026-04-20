//Importa o bcryptjs para embaralhar senhas
const bcryptjs = require('bcryptjs');

//Função para criar o hash (versão embaralhada) de uma senha
//Exemplo: "senha123" vira "$2a$10$Xk9..." - impossível de reverter
const hashPassword = async (password) => {
    //O número 10 é o "Custo" - quanto maior, mais seguro (e mais lento)
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

//Função para comparar uma senha digitada com o hash salvo no banco
const comparePassword = async (password, hash) => {
    //Retorna true se bater, false se não bater
    return await bcrypt.compare(password, hash);
};

module.exports = {hashPassword, comparePassword};