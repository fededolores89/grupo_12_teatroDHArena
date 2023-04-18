const db = require('../../database/models');

const apiCategoryController = {
  showCategories: (req, res) => {
    db.Category.findAll()
    .then(categories => {
      let respuesta = {
        meta:{
          status:200,
          total: categories.length,
          url: "api/categories"
        },
        data: categories
      }

      res.json(respuesta);
    })
  }
}

module.exports = apiCategoryController;