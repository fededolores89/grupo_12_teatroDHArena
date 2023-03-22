const fs = require("fs");
const path = require("path");


const db = require("../database/models");
const sequelize = db.sequelize;

const productsFilePath = path.join(__dirname, "../db/showsDataBase.json");
const categoriesFilePath = path.join(__dirname, "../db/categories.json");
const shows = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));



const controller = {
  index: (req, res) => {
     let categories =  db.Category.findAll()
      
     let shows = db.Shows.findAll({
       include: [{association: "Category"} ]
  })
 
     Promise.all([categories,shows])
          .then (function([resultadoCategories, resultadoShows]){
              res.render("main/index", {categories: resultadoCategories, shows: resultadoShows})
          })
     }
}
module.exports = controller;
