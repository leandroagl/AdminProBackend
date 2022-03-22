const { response } = require('express');


const getBusquedasTotales = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    console.log(busqueda);

    res.json({
        ok: true,
        msg: 'getBusquedasTotales',
        busqueda
    })



}


module.exports = {
    getBusquedasTotales
}