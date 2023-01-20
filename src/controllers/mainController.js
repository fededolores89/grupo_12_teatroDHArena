const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../database/showsDataBase.json");
const shows = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  index: (req, res) => {
    /* --------------Requerimos los shows----------------- */
    const shows = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    /* --------------filtramos por categoria ----------------- */
    let showsRockFiltrado = shows.filter((show) => {
      return show.category == "rock";
    });

    let showsPopFiltrado = shows.filter((show) => {
      return show.category == "pop";
    });

    res.render("main/index", {
      showsRockFiltrado: showsRockFiltrado,
      showsPopFiltrado: showsPopFiltrado,
    });
  },
};

module.exports = controller;
