const express = require("express")
const router = express.Router()

const apiUserController = require("../../controllers/api/apiUserController.js")
const apiShowController = require("../../controllers/api/apiShowController.js")

router.get("/users" , apiUserController.userList)

router.get('/users/:id', apiUserController.detail);

router.get("/shows" , apiShowController.showList)

router.get('/shows/:id', apiShowController.detail);

module.exports = router;