'use strict';

module.exports = function (app) {
    //Calling the Controller	
    var ImagenesController = require('../controllers/ImagenesMedicasController');

    // todoList Routes
    app.route('/ClasificacionImagenes')
        .post(ImagenesController.ClasificacionImagenes);

    app.route('/RegionImagenes')
        .post(ImagenesController.RegionImagenes);

    app.route('/DocumentosMedicos')
        .post(ImagenesController.DocumentosMedicos);

    app.route('/CargarMedia')
        .post(ImagenesController.CargarMedia);

    app.route('/MantGabinete')
        .post(ImagenesController.MantGabinete);

};