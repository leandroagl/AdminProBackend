/* 
    ruta: api/todo/:busqueda
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const { getBusquedasGlobales, getDocumentosColeccion } = require('../controllers/busquedas')

const router = Router();


router.get("/:busqueda", validarJWT, getBusquedasGlobales);

// Tabla es el nombre de la colección
router.get("/coleccion/:tabla/:busqueda", validarJWT, getDocumentosColeccion);


module.exports = router;