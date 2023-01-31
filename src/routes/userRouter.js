const express = require('express')
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
const mainController = require("../controllers/userController")

const validations = [
  body('name').notEmpty().withMessage('Ingrese su nombre').bail().isLength({ min: 3 }).withMessage('Ingrese un nombre válido'),
  body('lastname').notEmpty().withMessage('Ingrese su apellido').bail().isLength({ min: 3 }).withMessage('Ingrese un apellido válido'),
  body('documentNum').notEmpty().withMessage('Ingrese su número de documento').bail().isLength({ min: 8 }).withMessage('Ingrese un número de documento de al menos 8 carácteres'),
  body('number').notEmpty().withMessage('Ingrese su teléfono').bail().isNumeric().withMessage('Ingrese solo valores numéricos en el teléfono'),
  body('email').notEmpty().withMessage('Ingrese su email').bail().isEmail().withMessage('Ingrese un email válido'),
  body('password').notEmpty().withMessage('Ingrese su contraseña').bail().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage('Su contraseña debe tener al menos una letra mayúscula, una minúscula, un número y al menos 8 carácteres')
];

const loginValidations = [
  body('email').notEmpty().withMessage('Ingrese su email').bail().isEmail().withMessage('Ingrese un email valido'),
  body('password').notEmpty().withMessage('Ingrese su contraseña').bail().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage('Ingrese una contraseña válida')
];

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
const upload = multer({storage});

/* --------------Muestra la vista del login----------------- */
router.get('/login' , mainController.login )
router.post('/login', loginValidations, mainController.processLogin);

/* --------------Muestra la vista del registro----------------- */
router.get('/register' ,  mainController.registro )

router.post('/register', upload.single('image'), validations, mainController.create);

router.post('/logout', mainController.processLogout);




module.exports = router