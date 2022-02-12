const { getAllCategories } = require("../db/queries");

const router = require('express').Router();

const categoriesRoutes = () => {
  // routes
  router.get('/', (req, res) => {
    getAllCategories((categories) => {
      res.json(categories);
    });
  });
  return router;
};

module.exports = categoriesRoutes;
