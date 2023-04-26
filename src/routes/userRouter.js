const express = require('express')
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
const mainController = require("../controllers/userController")
const db = require('../database/models');
const User = db.Users;



const validations = [
  body('name').notEmpty().withMessage('Ingrese su nombre').bail().isLength({ min: 3 }).withMessage('Ingrese un nombre válido'),
  body('lastname').notEmpty().withMessage('Ingrese su apellido').bail().isLength({ min: 3 }).withMessage('Ingrese un apellido válido'),
  body('documentNum').notEmpty().withMessage('Ingrese su número de documento').bail().isLength({ min: 8 }).withMessage('Ingrese un número de documento de al menos 8 carácteres'),
  body('number').notEmpty().withMessage('Ingrese su teléfono').bail().isNumeric().withMessage('Ingrese solo valores numéricos en el teléfono'),
  body('email').notEmpty().withMessage('Ingrese su email').bail().isEmail().withMessage('Ingrese un email válido'),
  body('password').notEmpty().withMessage('Ingrese su contraseña').bail().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage('Su contraseña debe tener al menos una letra mayúscula, una minúscula, un número y al menos 8 carácteres. No debe incluir un caracter especial.')
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


User.findAll()
    .then((users) => {
router.post('/register', upload.single('image'), validations,
/* -------------Valido de los usuarios existen o no con la ---------------------- */
 [ body('email').custom(function (value) {
  let contador = 0;
  for (let i = 0; i < users.length; i++) {
      if (users[i].email == value) {
          contador++;
      }
  }
  if (contador > 0) {
      return false;   // Si retorno falso no aparece el mensaje de error
  } else {
      return true;    //Si retorno true, aparece el mensaje de error
  }
}).withMessage('Usuario ya se encuentra registrado'),
/*----------- Aquí valido si las contraseñas son iguales o no ----------*/
/* -----El ( value ) viene a ser el valor que viaje en el name del del input del campo --------- */
/* ------------El valor { req } corresponde a lo que viene desde el formulario----------- */

body('confirm_password').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true    // Si yo retorno un true  no se muestra el error     
        }else{
            return false   // Si retorno un false si se muestra el error
        }    
}).withMessage('Las contraseñas deben ser iguales'), 
/* ---------- Aquí obligo a que el usuario seleccione su avatar y que tienen que ser archivos JPG , JPEG , PNG, GIF------------*/
body('avatar').custom(function (value, { req }) {
  let ext
  if(req.file != undefined ){
      return true
  }else{
      ext = ""+path.extname(req.files[0].filename).toLowerCase();
  }
  //console.log(ext);
  if (
      ext == ".jpg" ||
      ext == ".jpeg" ||
      ext == ".png" ||
      ext == ".gif"){
          return true;
      }
      return false;
}).withMessage('Solo debe seleccionar archivos  con extensión JPG, JPEG, PNG o GIF')], mainController.create);
    
})
router.post('/logout', mainController.processLogout);




module.exports = router