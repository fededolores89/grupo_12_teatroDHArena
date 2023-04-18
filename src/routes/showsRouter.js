const express = require('express')
const router = express.Router()
const mainController = require("../controllers/showsController.js")
const { body } = require('express-validator');
const multer = require("multer");
const path = require('path');

//Validaciones para crear un show
const validations = [
    body('name').notEmpty().withMessage('Ingrese el nombre del artista').bail().isLength({ min: 5 }),
    body('price').notEmpty().withMessage('Ingrese el precio del show').bail().isNumeric().withMessage('El precio debe ser un valor numerico'),
    body('date').isISO8601().withMessage('Ingrese una fecha válida'),
    body('descriptionHeader').notEmpty().withMessage('Ingrese la descripción del evento').bail().isLength({ min: 20 }),
    body('descriptionVideo').notEmpty().withMessage('Ingrese la descripción del artista'),
    body('image').isIn([ "PNG", "JPEG", "GIF" ]).withMessage('Ingrese un archivo valido de imagen (png, jpeg, gif)')
];

const adminMiddleware = require('../middlewares/users/adminMiddleware.js');
const authMiddleware = require('../middlewares/users/authMiddleware.js');


/* --------------Creamos la ruta y el nombre de la imagen----------------- */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/img/Img-Index-Artistas")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
/* --------------Pasamos a la variable uploud el metodo storage----------------- */
const upload = multer({storage: storage});


/* Vista a todos los Shows */
router.get("/" , mainController.index )

/* Creacion de show */
router.get('/create' , adminMiddleware, mainController.create)
router.post('/create', upload.single("artistImage"), validations, mainController.processCreate)

/* Vista a el show */
router.get('/:id' , mainController.detalle)

/* Editar Show */
router.get('/:id/edit', mainController.edit)

// adminMiddleware,

router.put('/:id/edit', upload.single("editedArtistImage") ,mainController.processEdit)

// Agregar show al carrito
router.get('/:id/agregar', authMiddleware, mainController.addCart);

/* Borrar un Show */
router.delete('/:id', mainController.destroy);






//asdasdsa




module.exports = router