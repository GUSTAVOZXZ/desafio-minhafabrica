const productService = require('../services/productService');

const productController = {
  getAll: async (req, res, next) => {
    try {
      const products = await productService.getAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const product = await productService.getById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const result = await productService.delete(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;