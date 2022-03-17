const { response } = require('express');


const getMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getMedicos'
    })
}

const crearMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'crearMedico'
    })
}

const borrarMedico = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}

const actualizarMedico = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    borrarMedico,
    actualizarMedico
}