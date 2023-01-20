const express = require('express')
const router = express.Router()

const mainController = require("../controllers/mainController.js")

/* --------------Muestra el Home----------------- */
router.get('/' , mainController.index )



module.exports = router
