const express = require("express")
const router = express.Router()

const apiUserController = require("../../controllers/api/apiUserController.js")

router.get("/users" , apiUserController.userList)

router.get('/users/:id', apiUserController.detail);

module.exports = router;