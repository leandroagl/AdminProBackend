/* 
    ruta: api/todo/:busqueda
*/

const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const { getBusquedasTotales } = require('../controllers/busquedas')

const router = Router();


router.get("/:busqueda", validarJWT, getBusquedasTotales);


module.exports = router;