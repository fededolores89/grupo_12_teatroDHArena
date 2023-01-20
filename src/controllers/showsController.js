const fs = require("fs");
const path = require("path");
const { emitWarning } = require("process");
const showsFilePath = path.join(__dirname, "../database/showsDataBase.json");
const shows = JSON.parse(fs.readFileSync(showsFilePath, "utf-8"));

const controllers = {
  index: (req, res) => {
    const shows = JSON.parse(fs.readFileSync(showsFilePath, "utf-8"));

    res.render("product/allsTheShows", { shows: shows });
  },
  detalle: (req, res) => {
    let id = req.params.id;
    const shows = JSON.parse(fs.readFileSync(showsFilePath, "utf-8"));

    let showsFiltrado = shows.find((show) => {
      return show.id == id;
    });

    res.render("product/productDetail", { shows: showsFiltrado });
  },
  edit: (req, res) => {
    let id = req.params.id;
    const shows = JSON.parse(fs.readFileSync(showsFilePath, "utf-8"));

    let showsFiltrado = shows.find((show) => {
      return show.id == id;
    });

    res.render("product/editShows", { shows: showsFiltrado });
  },

  processEdit: (req, res) => {
    res.redirect("main/index");
  },
  create: (req, res) => {
    
     res.render("product/createShow");
  },

  processCreate: (req, res) => {
    // Do the magic
   res.send(req.body)
  },
  shoppingCart: (req, res) => {
    res.render("productCart");
  },
};

module.exports = controllers;
