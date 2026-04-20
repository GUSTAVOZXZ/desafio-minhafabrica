const productRepository = require('../repositories/productRepository');

const productService = {
    getAll: async () => {
        return await productRepoitory.findAll();
    },

    getById: async (id) => {
        const product = await productRepository.findById(id);
        if(!product) {
            const error = new Error('Produto não encontrado');
            error.status = 404;
            throw error;            
        }
        return product;
    },

    create: async (data) => {
        return await productRepoitory.create(data);
    },

    update: async (id, data) => {
        const product = await productRepoitory.update(id, data);
        if(!product){
            const error = new Error('Produto não encontrado');
            error.status = 404;
            throw error;
        }
        return product;
    },

    delete: async (id) => {
        const product = await productRepository.delete(id);
        if(!product){
            const error = new Error('Produto não encontrado');
            error.status = 404;
            throw error;
        }
        return{message: 'Produto excluído com sucesso'};
    },
};

module.exports = productService;