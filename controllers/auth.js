const {response} = require("express/lib/response");
const bcrypt = require("bcryptjs");

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");




const login = async(req, res = response) => {

    const { email, password } = req.body;


    try {
        // verificar email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB) {
            return res.status(404).json({
                ok: true,
                msg: "Email no encontrado"
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña no es válida"
            })
        }

        // Generar Token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al intentar iniciar sesión."
        })
    }

}

module.exports = {
    login
}