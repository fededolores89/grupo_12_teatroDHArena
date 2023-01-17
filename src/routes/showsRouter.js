const express = require('express')
const router = express.Router()

const mainController = require("../controllers/showsController.js")



router.get("/" , mainController.index )

router.get('/detalle' , mainController.detalle)












module.exports = router