const express = require('express')
const router = express.Router()

const mainController = require("../controllers/showsController.js")
const { route } = require('./mainRouter.js')


/* Vista a todos los Shows */
router.get("/" , mainController.index )

/* Creacion de show */
router.get('/create' , mainController.create)
router.post('/create' , mainController.processCreate)

/* Vista a el show */
router.get('/detail/:id' , mainController.detalle)

/* Editar Show */
router.get('/detail/:id/edit/' , mainController.edit)
router.put('/detail/edit/:id' , mainController.processEdit)

/* Carrito de compras */
router.get('/detail/:id/compra', mainController.shoppingCart)


/* Borrar un Show */

//router.delete('/delete/:id', productsController.destroy);











module.exports = router