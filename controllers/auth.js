const {response} = require("express/lib/response");
const bcrypt = require("bcryptjs");

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");




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

const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar Token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }
    

}


module.exports = {
    login,
    googleSignIn
}