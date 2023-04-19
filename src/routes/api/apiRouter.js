const express = require("express")
const router = express.Router()

const apiUserController = require("../../controllers/api/apiUserController.js")
const apiShowController = require("../../controllers/api/apiShowController.js")
const apiCategoryController = require('../../controllers/api/apiCategoryController.js');

router.get("/users" , apiUserController.userList)

router.get('/users/:id', apiUserController.detail);

router.get("/shows" , apiShowController.showList)

router.get("/shows/count" , apiShowController.showCount)

router.get("/shows/countByCategory" , apiShowController.showCountByCategory)


router.get("/categories" , apiCategoryController.showCategories);

router.get('/shows/:id', apiShowController.detail);

module.exports = router;