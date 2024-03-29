const fs = require("fs");
const path = require("path");
const { emitWarning } = require("process");
const { validationResult } = require('express-validator');
const cartFilePath = path.join(__dirname, "../db/shoppingCart.json");
const shoppingCartItems = JSON.parse(fs.readFileSync(cartFilePath, "utf-8"));

const db = require('../database/models');
const sequelize = db.sequelize;

const controllers = {
  /* --------------Muestra Todos los Shows----------------- */
  index: (req, res) => {
    db.Shows.findAll({
      include: [{association: "Category"} ],
      order: [
        ['date', 'DESC']
      ]
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
  
  search: (req, res) => {
    res.send("Search")
 },


  /* --------------Muestra El Shows que queremos editar----------------- */
  edit: (req, res) => {
    let id = req.params.id;
    db.Shows.findByPk(id)
      .then(shows =>{
        if(shows === undefined) {
          res.send('No se encontro ese evento. Intento con otro');
        } else {
          db.Category.findAll()
          .then(categories => {
            res.render("product/editShows", { show: shows, categories: categories });
          })
        }
      })
  },

  
  /* --------------Procesa la Edicion----------------- */
  processEdit: (req, res) => {
    db.Shows.update({
      name: req.body.name,
      price: parseFloat(req.body.price),
      id_category: req.body.categoryId,
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
    db.Category.findAll()
    .then(categories => {
      res.render("product/createShow", {categories: categories});
    })
  },

  /* --------------Guarda el show creado----------------- */
  processCreate: (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
      db.Shows.create({
        name: req.body.name,
        price: req.body.price,
        id_category: req.body.categoryId,
        descriptionHeader: req.body.descriptionHeader,
        descriptionVideo: req.body.descriptionVideo,
        image: req.file ? req.file.filename : "default-image.png",
        video: req.body.video ? req.body.video: "https://www.youtube.com/embed/WEms4KB2Q3o",
        hour: req.body.hour,
        date: req.body.date
      }) ;
      res.redirect("/shows");
    } else {
      const validations = errors.array();
      const inputs = req.body;

      db.Category.findAll()
      .then(categories => {
        res.render('product/createShow', {categories: categories, errors: validations, inputs: inputs});
      })

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
