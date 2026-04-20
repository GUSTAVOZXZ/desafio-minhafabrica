const userService = require('../services/userService');

const userController = {
  getAll: async (req, res, next) => {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      // req.params.id = o :id que vem na URL (/api/v1/users/123)
      const user = await userService.getById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user); // 201 = Created
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const user = await userService.update(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const result = await userService.delete(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;