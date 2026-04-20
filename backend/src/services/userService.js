const userRepository = require('../repositories/userRepository');
const {hashPassword} = require ('../utils/hashPassword');

const userService = {
    getAll: async () => {
        return await userRepository.findAll();
    },

    getById: async (id) => {
        const user = await userRepository.findById(id);
        if(!user) {
            const error = new Error('Usuário não encontrado');
            error.status = 404;
            throw error;
        }
        return user;
    },

    create: async ({name, email, password, role}) => {
        //Verifica se já existe um usuário com esse e-mail
        const existing = await userRepository.findByEmail(email);
        if(existing){
            const error = new Error('E-mail ja cadastrado');
            error.status = 409; //409 = Conflict (conflito)
            throw error;
        }

        //Embaralhar a senha antes de salvar
        const hashed = await hashPassword(password);

        return await userRepository.create({name, email, password: hashed, role});
    },

    update: async (id, {name, email, password, role}) => {
        //Monta o objetosó com os campos que foram enviados
        const updateData = {};
        if(name) updateData.name = name;
        if(email) updateData.email = email;
        if(role) updateData.role = role;
        //Se enviou nova senha, faz o hash antes de salvar
        if(password) updateData.password = await hashPassword(password);

        const user = await userRepository.update(id, updateData);
        if(!user) {
            const error = new Error('Usuário não encontrado');
            error.status = 404;
            throw error;
        }
        return user;
    },

    delete: async (id) => {
        const user = await userRepository.delete(id);
        if(!user){
            const error = new Error('Usuário não encontrado');
            error.status = 404;
            throw error;
        }
        return {message: 'Usuário excluído com sucesso'};
    },
};

module.exports = userService;