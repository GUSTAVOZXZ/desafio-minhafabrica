const User = require('../models/User');

const userRepository = {
    //Busca todos os usuários (sem retornar senha)
    findAll: async () => {
        return await User.find().select('-password');
        //.select('-password') = "me de tudo EXCETO o campo password"
    },

    //Busca um usuário pelo ID
    findByID: async (id) => {
        return await User.findById(id).select('-password');
    },

    //Buscar um usuário pelo e-mail (usado no login)
    findByEmail: async (email) => {
        return await User.findOne({email});
        //Aqui retorna a senha também (precisamos para comparar no login)
    },

    //Cria e salva um novo usuário no banco
    create: async (UserData) => {
        const user = new User(userData);
        await user.save();
        //Retorna o usuário sem a senha
        const {password, ...userWithoutPassword} = user.toObject();
        return userWithoutPassword;
    },

    //Atualiza um usuário pelo ID e retorna o documento atualizado
    update: async (id, userData) => {
        return await User.findByIdAndUpdate(
            id,
            userData,
            {new: true, runValidators: true} //new: true = retorna o documento APÓS a atualialização
        ).select('-password');
    },

    //Remove um usuário pelo ID
    delete: async (id) => {
        return await User.findByIdAndDelete(id);
    },

    //Conta quantos usuários existem no banco
    count: async () => {
        return await User.countDocuments();
    },
};

module.exports = userRepository;