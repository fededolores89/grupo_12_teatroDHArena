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
    /* Incorporar FS */
    /* Leer el archivo */
    const shows = JSON.parse(fs.readFileSync(showsFilePath, "utf-8"));
   
    let nuevoShow = {
      /* revisar el ultimo producto, y tomar su ID. Luego sumarle 1 */
      id: shows[shows.length - 1].id + 1,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      descriptionHeader: req.body.descriptionHeader,
      descriptionVideo: req.body.descriptionVideo,
      video: req.body.video,
      day: req.body.day,
      hour: req.body.hour,
      image: req.file ? req.file.filename : "default-image.png",
      month: req.body.month
    };
  console.log(req.body, req.file)
    /* Push */
    shows.push(nuevoShow);
    /* Convertir a JSON */
    /* Escribir sobre el archivo json */
    fs.writeFileSync(showsFilePath, JSON.stringify(shows, null, " "));
    res.redirect("/shows");
  },

  destroy: (req, res) => {
    // Do the magic
    
    const shows = JSON.parse(fs.readFileSync(showsFilePath, "utf-8"));
    let id = req.params.id;
    
    console.log(shows)
    
    fs.writeFileSync(
      showsFilePath,
      JSON.stringify(showsFiltrados, null, " ")
    );

    res.redirect("/shows");
  },
  shoppingCart: (req, res) => {
    res.render("productCart");
  },
};

module.exports = controllers;
