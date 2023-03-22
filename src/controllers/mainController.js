const fs = require("fs");
const path = require("path");


const db = require("../database/models");
const sequelize = db.sequelize;

const productsFilePath = path.join(__dirname, "../db/showsDataBase.json");
const categoriesFilePath = path.join(__dirname, "../db/categories.json");
const shows = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  index: (req, res) => {
    db.Shows.findAll({
         include: [ {association: "Category"}  ]
    })
         .then(function(shows){
             res.render("product/allsTheShows", {shows:shows})
         })
 }
}
module.exports = controller;
