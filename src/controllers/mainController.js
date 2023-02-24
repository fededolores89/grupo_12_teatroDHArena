const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../db/showsDataBase.json");
const categoriesFilePath = path.join(__dirname, "../db/categories.json");
const shows = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  index: (req, res) => {

    const categories = JSON.parse(fs.readFileSync(categoriesFilePath, "utf-8"));

    res.render("main/index", {categories: categories, shows: shows});
  },
};

module.exports = controller;
