const express = require('express')
const router = express.Router()

const mainController = require("../controllers/userController")




/* --------------Muestra la vista del login----------------- */
router.get('/login' , mainController.login ) 

/* --------------Muestra la vista del registro----------------- */
router.get('/register' ,  mainController.registro )








module.exports = router