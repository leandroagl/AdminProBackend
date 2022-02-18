const { response } = require('express');
// Para capturar los errores de validacion en el archivo de rutas
const { validationResult } = require('express-validator')

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {

    // Buscar usuarios dentro de la coleccion
    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios
    });

}

const crearUsuario = async (req, res = response) => {

    const { nombre, email, password } = req.body;




    try {

        // Validar si el ususario existe
        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: "El correo ya está registrado"
            })
        }

        // Nueva instancia del Schema Usuario
        const usuario = new Usuario(req.body);
        // Se aguarda la finalización de la promesa
        await usuario.save();

        res.json({
            ok: true,
            usuario
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }
}




module.exports = {
    getUsuarios,
    crearUsuario
}