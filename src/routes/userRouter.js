const express = require('express')
const router = express.Router();
const path = require('path');
const multer = require('multer');
const mainController = require("../controllers/userController")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, '../../public/img/img-users');
    cb(null, folder)
  },
  filename: (req, file, cb) => {
    let imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  }
});

const uploadFile = multer({storage});

/* --------------Muestra la vista del login----------------- */
router.get('/login' , mainController.login ) 

/* --------------Muestra la vista del registro----------------- */
router.get('/register' ,  mainController.registro )

router.post('/register', uploadFile.single('image'), mainController.create);






module.exports = router