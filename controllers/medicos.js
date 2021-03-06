const { response } = require('express');

const Medico = require('../models/medico')


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img')

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {
        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            msg: 'Medico creado correctamente.',
            medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar médico en la base de datos, hable con el administrador'
        })
    }

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