const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')

const getBusquedasGlobales = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    
    // Expresión regular
    const regex = new RegExp( busqueda, 'i' );


    // Esta es una forma eficiente de resolver varias promesas 
    // en simultaneo
    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales,
    })
}


module.exports = {
    getBusquedasGlobales
}