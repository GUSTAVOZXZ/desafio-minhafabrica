const userRepository = require('../repositories/userRepository');
const productRepository = require('../repositories/productRepository');

const dashboardController = {
  getStats: async (req, res, next) => {
    try {
      // Busca a contagem de usuários e produtos ao mesmo tempo (em paralelo)
      const [totalUsers, totalProducts] = await Promise.all([
        userRepository.count(),
        productRepository.count(),
      ]);

      res.status(200).json({ totalUsers, totalProducts });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = dashboardController;