const Product = require('../models/Product')

const productRepository = {
    findAll: async () => {
        return await Product.find();
    },

    findById: async (id) => {
        return await Product.findById(id);
    },

    create: async (productData) => {
        const product = new Product(productData);
        return await product.save();
    },

    update: async (id, productData) => {
        return await Product.findByIdAndUpdate(id, productData, {
            new: true,
            runValidators: true,
        });
    },

    delete: async (id) => {
        return await Product.countDocuments();
    },
};

module.exports = productRepository;