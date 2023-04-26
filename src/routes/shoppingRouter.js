const express = require('express')
const router = express.Router();

const shoppingCartController = require('../controllers/shoppingCartController.js');

const authMiddleware = require('../middlewares/users/authMiddleware.js');

/* Carrito de compras */
router.get('/', authMiddleware, shoppingCartController.shoppingCart);

// Agregar show al carrito
router.post('/:id/agregar', shoppingCartController.addCart);

router.delete('/eliminar', shoppingCartController.deleteItem);

module.exports = router;