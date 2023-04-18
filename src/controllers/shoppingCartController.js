const fs = require("fs");
const path = require("path");
const cartFilePath = path.join(__dirname, "../db/shoppingCart.json");
const shoppingCartItems = JSON.parse(fs.readFileSync(cartFilePath, "utf-8"));

const controller = {
  shoppingCart: (req, res) => {
    const shoppingCartItems = JSON.parse(fs.readFileSync(cartFilePath, "utf-8"));

    res.render('product/productCart', {shoppingCartItems: shoppingCartItems});
  },

  deleteItem: (req, res) => {

    const id = parseInt(req.params.id);

    let showIndex = shoppingCartItems.findIndex(show => show.id === id);

    shoppingCartItems.splice(showIndex, 1);

    fs.writeFileSync(cartFilePath, JSON.stringify(shoppingCartItems, null, " "));
    res.redirect("/carrito");
  }
};

module.exports = controller;