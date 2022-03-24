const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagenAnterior = (path) => {
    if( fs.existsSync(path) ) {
        // Borrar la imagen anterior
        fs.unlinkSync(path)
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch( tipo ) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if( !medico ) {
                console.log('No se encontró ese medico por ID');
                return false;
            }

             // Genero el path viejo y elimino la imagen anterior
            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagenAnterior(pathViejo);

            // Guardo la imagen en el medico
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if( !hospital ) {
                console.log('No se encontró ese hospital por ID');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagenAnterior(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if( !usuario ) {
                console.log('No se encontró ese usuario por ID');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagenAnterior(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;
    }

}

module.exports = {
    actualizarImagen
}