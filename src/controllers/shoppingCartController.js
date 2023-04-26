const fs = require("fs");
const path = require("path");
const cartFilePath = path.join(__dirname, "../db/shoppingCart.json");
const shoppingCartItems = JSON.parse(fs.readFileSync(cartFilePath, "utf-8"));
const db = require('../database/models');

const controller = {
  shoppingCart: (req, res) => {
    let user = req.session.authUser;

    db.Orders.findAll({
      where: {
        user_id: user.id
      },
      include: [
        {association: 'Show'}
      ]
    })
    .then(result => {
      //res.send(result);
      res.render('product/productCart', {shoppingCartItems: result});
    })

  },

  addCart: async(req, res) => {
    const id =  parseInt(req.params.id);

    let show = await db.Shows.findByPk(id)
    .then(data => data);

    if(show != undefined) {

      //Buscar si ya se agrego antes el item para no repetir
      let prevOrders = await db.Orders.findOne({
        where: {
          show_id: req.body.show_id,
          user_id: req.body.user_id
        }
      }).then(result => result);

      //Si es null, entonces el producto no se ha registrado antes y debe crearse
      if(prevOrders == null) {
        db.Orders.create({
          show_id: req.body.show_id,
          user_id: req.body.user_id
        })
        .then(result => res.redirect('/carrito'))
        .catch(error => console.log(error));
      } else {
        //Si ya existe, entonces solo redireccionar al carrito
        res.redirect('/carrito');
      }

    } 
  },

  deleteItem: (req, res) => {

    let userId = req.body.user_id;
    let showId = req.body.show_id;

    db.Orders.destroy({
      where: {
        user_id: userId,
        show_id: showId
      }
    })
    .then(result => {
      res.redirect('/carrito');
    })
    .catch(error => console.log(error));

  }
};

module.exports = controller;