const express = require('express')
const router = express.Router();

const shoppingCartController = require('../controllers/shoppingCartController.js');

/* Carrito de compras */
router.get('/', shoppingCartController.shoppingCart);

router.delete('/:id', shoppingCartController.deleteItem);

module.exports = router;