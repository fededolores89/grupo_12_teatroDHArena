const express = require('express')
const router = express.Router()

const mainController = require("../controllers/userController")




//Login
router.get('/login' , mainController.login ) 









module.exports = router