const fs = require("fs");
const path = require("path");
const cartFilePath = path.join(__dirname, "../db/shoppingCart.json");
const shoppingCartItems = JSON.parse(fs.readFileSync(cartFilePath, "utf-8"));
const db = require('../database/models');

const controller = {
  shoppingCart: (req, res) => {
    res.render('product/productCart', {shoppingCartItems: shoppingCartItems});
  },

  addCart: async(req, res) => {
    const id =  parseInt(req.params.id);

    let show = await db.Shows.findByPk(id)
    .then(data => data);

    if(show != undefined) {

      let itemWasCreatedBefore = shoppingCartItems.find(element => element.id == show.id);

      if(itemWasCreatedBefore == undefined) {
        shoppingCartItems.push(show);
        fs.writeFileSync(cartFilePath, JSON.stringify(shoppingCartItems, null, " "));

        setTimeout(() => {
          res.redirect("/carrito");
        }, 5000)
      } else {
        res.redirect('/carrito');
      };

    } 
  },

  deleteItem: (req, res) => {

    const id = parseInt(req.params.id);
    let showIndex = shoppingCartItems.findIndex(show => show.id === id);

    shoppingCartItems.splice(showIndex, 1);
    fs.writeFileSync(cartFilePath, JSON.stringify(shoppingCartItems, null, " "));

    res.redirect('/carrito');
  }
};

module.exports = controller;