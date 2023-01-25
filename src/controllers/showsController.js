const fs = require("fs");
const path = require("path");
const { emitWarning } = require("process");
const showsFilePath = path.join(__dirname, "../database/showsDataBase.json");
const shoppingCartFilePath = path.join(__dirname, "../database/shoppingCart.json");
const shows = JSON.parse(fs.readFileSync(showsFilePath, "utf-8"));

const controllers = {
  /* --------------Muestra Todos los Shows----------------- */
  index: (req, res) => {

    res.render("product/allsTheShows", { shows: shows });
  },

  /* --------------Muestra el show en detalle por id----------------- */
  detalle: (req, res) => {
    let id = req.params.id;

    let showsFiltrado = shows.find((show) => {
      return show.id == id;
    });

    res.render("product/productDetail", { shows: showsFiltrado });
  },

  /* --------------Muestra El Shows que queremos editar----------------- */
  edit: (req, res) => {
    let id = req.params.id;

    let showsFiltrado = shows.find((show) => {
      return show.id == id;
    });
    
    res.render("product/editShows", { shows: showsFiltrado });
  },

  
  /* --------------Procesa la Edicion----------------- */
  processEdit: (req, res) => {
    // Do the magic

	const shows = JSON.parse(fs.readFileSync(showsFilePath, "utf-8"));
		/* Incorporar FS */
		/* Leer el archivo */

		let id = req.params.id;
		let showAnterior = shows.find(show => {
			return show.id == id
		})

		let showEditado = {
			
			id: showAnterior.id,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      descriptionHeader: req.body.descriptionHeader,
      descriptionVideo: req.body.descriptionVideo,
      video: req.body.video,
      day: req.body.day,
      hour: req.body.hour,
      image: req.file ? req.file.filename : "default-image.png",
      month: req.body.month,
		}
		
		let indice = shows.findIndex(product => {
			return product.id == id
		})

		shows[indice] = showEditado;
   
	
		fs.writeFileSync(showsFilePath, JSON.stringify(shows, null, " "));
		res.redirect("/");
  },

  /* --------------Muestro la vista de crear shows----------------- */
  create: (req, res) => {
    res.render("product/createShow");
  },

  /* --------------Guarda el show creado----------------- */
  processCreate: (req, res) => {
    // Do the magic

    let nuevoShow = {
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
      month: req.body.month,
    };
    shows.push(nuevoShow);
    fs.writeFileSync(showsFilePath, JSON.stringify(shows, null, " "));
    res.redirect("/shows");
  },

  /* --------------Borra el Show de la DataBase ----------------- */
  destroy: (req, res) => {
    // Do the magic

    let id = req.params.id;

    console.log(shows);

    fs.writeFileSync(showsFilePath, JSON.stringify(showsFiltrados, null, " "));

    res.redirect("/shows");
  },
  shoppingCart: (req, res) => {
    const shoppingCartItems = JSON.parse(fs.readFileSync(shoppingCartFilePath, "utf-8"));

    res.render('product/productCart', {shoppingCartItems: shoppingCartItems});
  },
};

module.exports = controllers;
