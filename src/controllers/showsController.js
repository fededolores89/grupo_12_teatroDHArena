const fs = require("fs");
const path = require("path");
const { emitWarning } = require("process");
const { validationResult } = require('express-validator');
const showsFilePath = path.join(__dirname, "../db/showsDataBase.json");
const cartFilePath = path.join(__dirname, "../db/shoppingCart.json");
const categoriesFilePath = path.join(__dirname, "../db/categories.json");
const shoppingCartItems = JSON.parse(fs.readFileSync(cartFilePath, "utf-8"));
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, "utf-8"));

const db = require('../database/models');
const sequelize = db.sequelize;

const controllers = {
  /* --------------Muestra Todos los Shows----------------- */
  index: (req, res) => {
    db.Shows.findAll({
      include: [{association: "Category"} ]
 })
    .then(function(shows){
      
      res.render("product/allsTheShows", {shows:shows})
    })
 },

  /* --------------Muestra el show en detalle por id----------------- */
  detalle: (req, res) => {
    let id = req.params.id;

    db.Shows.findByPk(id,{
        include: [{association: "Category"} ] 
    })
    .then(shows =>{
          if (shows === undefined){
                res.send('No se encontro el que busca, intente con otro')
          }else{
            let date = shows.date.split('-');

            res.render("product/productDetail", { show: shows, showDate: date });
          }
        })
  },      


  /* --------------Muestra El Shows que queremos editar----------------- */
  edit: (req, res) => {
    let id = req.params.id;
    db.Shows.findByPk(id)
      .then(shows =>{
        if(shows === undefined) {
          res.send('No se encontro ese evento. Intento con otro');
        } else {
          res.render("product/editShows", { show: shows, categories: categories });
        }
      })
  },

  
  /* --------------Procesa la Edicion----------------- */
  processEdit: (req, res) => {
    db.Shows.update({
      name: req.body.name,
      price: parseFloat(req.body.price),
      categoryId: parseInt(req.body.categoryId),
      descriptionHeader: req.body.descriptionHeader,
      descriptionVideo: req.body.descriptionVideo,
      video: req.body.video,
      image: req.body.image,
      month: req.body.month,
    },{
      where:{
        id: req.params.id
      }
    })
      .then(result =>{
          res.redirect("/shows")
      })
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
    db.Shows.destroy({
      where:{
          id : req.params.id
      }
  })
  .then(result =>{
      res.redirect("/shows")
  }) 

  }
};

module.exports = controllers;
