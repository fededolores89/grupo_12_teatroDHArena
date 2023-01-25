const express = require('express')
const router = express.Router()
const mainController = require("../controllers/showsController.js")
const multer = require("multer");
const path = require('path')




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
const upload = multer({storage: storage})


/* Vista a todos los Shows */
router.get("/" , mainController.index )

/* Creacion de show */
router.get('/create' , mainController.create)
router.post('/create' , upload.single("artistImage"), mainController.processCreate)

/* Vista a el show */
router.get('/:id' , mainController.detalle)

/* Editar Show */
router.get('/:id/edit' , mainController.edit)
router.put('/:id/edit' , upload.single("editedArtistImage") ,mainController.processEdit)

// Agregar show al carrito
router.get('/:id/agregar', mainController.addCart);

/* Borrar un Show */

router.delete('/:id', mainController.destroy);











module.exports = router