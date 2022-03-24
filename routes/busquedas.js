/* 
    ruta: api/todo/:busqueda
*/

const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const { getBusquedasGlobales } = require('../controllers/busquedas')

const router = Router();


router.get("/:busqueda", validarJWT, getBusquedasGlobales);


module.exports = router;