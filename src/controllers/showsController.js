const fs = require("fs");
const path = require("path");
const { emitWarning } = require("process");
const { validationResult } = require('express-validator');
const showsFilePath = path.join(__dirname, "../database/showsDataBase.json");
const cartFilePath = path.join(__dirname, "../database/shoppingCart.json");
const categoriesFilePath = path.join(__dirname, "../database/categories.json");
const shows = JSON.parse(fs.readFileSync(showsFilePath, "utf-8"));
const shoppingCartItems = JSON.parse(fs.readFileSync(cartFilePath, "utf-8"));
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, "utf-8"));

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

    if(showsFiltrado === undefined) {
      res.send('No se encontro el que busca, intente con otro')
    } else {

      let date = showsFiltrado.date.split('-');

      res.render("product/productDetail", { show: showsFiltrado, showDate: date });
    }
  },

  /* --------------Muestra El Shows que queremos editar----------------- */
  edit: (req, res) => {
    let id = req.params.id;

    let showsFiltrado = shows.find((show) => {
      return show.id == id;
    });

    if(showsFiltrado === undefined) {
      res.send('No se encontro ese evento. Intento con otro');
    } else {
      res.render("product/editShows", { show: showsFiltrado, categories: categories });
    }
    
  },

  
  /* --------------Procesa la Edicion----------------- */
  processEdit: (req, res) => {

		let id = req.params.id;
		let showAnterior = shows.find(show => {
			return show.id == id
		})

		let showEditado = {
			
			id: showAnterior.id,
      name: req.body.name,
      price: parseFloat(req.body.price),
      categoryId: parseInt(req.body.categoryId),
      descriptionHeader: req.body.descriptionHeader,
      descriptionVideo: req.body.descriptionVideo,
      video: req.body.video,
      image: req.file ? req.file.filename : showAnterior.image,
      month: req.body.month,
		}
		
		let indice = shows.findIndex(product => {
			return product.id == id;
		})

		shows[indice] = {...showAnterior, ...showEditado};
   
	
		fs.writeFileSync(showsFilePath, JSON.stringify(shows, null, " "));
		res.redirect("/");
  },

  /* --------------Muestro la vista de crear shows----------------- */
  create: (req, res) => {
    res.render("product/createShow", {categories: categories});
  },

  /* --------------Guarda el show creado----------------- */
  processCreate: (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
      let nuevoShow = {
        id: shows[shows.length - 1].id + 1,
        name: req.body.name,
        price: parseFloat(req.body.price),
        categoryId: parseInt(req.body.categoryId),
        descriptionHeader: req.body.descriptionHeader,
        descriptionVideo: req.body.descriptionVideo,
        image: req.file ? req.file.filename : "default-image.png",
        video: req.body.video ? req.body.video: "https://www.youtube.com/embed/WEms4KB2Q3o",
        hour: req.body.hour,
        date: req.body.date
      };
  
      shows.push(nuevoShow);
      fs.writeFileSync(showsFilePath, JSON.stringify(shows, null, " "));
      res.redirect("/shows");
    } else {
      const validations = errors.array();
      const inputs = req.body;

      res.render('product/createShow', {categories: categories, errors: validations, inputs: inputs});
    }

  },

  addCart: (req, res) => {
    const id =  parseInt(req.params.id);

    let showFiltered = shows.find(show => show.id === id);

    if(showFiltered === undefined) {
      res.send('No fue posible agregar el evento al carrito de compras');
    } else {

      let itemFiltered = shoppingCartItems.find(item => item.id === id);

      if(itemFiltered === undefined) {
        shoppingCartItems.push(showFiltered);
        fs.writeFileSync(cartFilePath, JSON.stringify(shoppingCartItems, null, " "));
        res.redirect("/carrito");
      } else {
        res.redirect("/carrito");
      }
    }
  },

  /* --------------Borra el Show de la DataBase ----------------- */
  destroy: (req, res) => {
    // Do the magic

    let id = parseInt(req.params.id);

    let showIndex = shows.findIndex(show => show.id === id);

    if(showIndex != undefined) {

      shows.splice(showIndex, 1);

      fs.writeFileSync(showsFilePath, JSON.stringify(shows, null, " "));
  
      res.redirect("/shows");
    } else {
      res.send('No se encontro ese show para eliminarse');
    }

  }
};

module.exports = controllers;
