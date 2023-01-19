const express = require('express')
const router = express.Router()

const mainController = require("../controllers/showsController.js")



router.get("/" , mainController.index )

router.get('/detalle/:id' , mainController.detalle)

router.get('/edit/:id' , mainController.edit)











module.exports = router