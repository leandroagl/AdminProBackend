const Usuario = require('../models/usuario')

const getUsuarios = (req, res) => {

    res.json({
        ok: true,
        msg: 'getUsuarios'
    });

}

const crearUsuario = async(req, res) => {

    const { nombre, email, password } = req.body;

    // Nueva instancia del Schema Usuario
    const usuario = new Usuario( req.body );

    // Se aguarda la finalización de la promesa
    await usuario.save();

    res.json({
        ok: true,
        usuario
    });

}




module.exports = {
    getUsuarios,
    crearUsuario
}