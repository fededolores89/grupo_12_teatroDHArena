const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../database/showsDataBase.json");
const categoriesFilePath = path.join(__dirname, "../database/categories.json");
const shows = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  index: (req, res) => {

    const categories = JSON.parse(fs.readFileSync(categoriesFilePath, "utf-8"));

    res.render("main/index", {categories: categories, shows: shows});

    //res.send(categories);
  },
};

module.exports = controller;
