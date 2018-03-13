'use strict';

module.exports = function (app) {
    //Calling the Controller	
    var IncapacidadesController = require('../controllers/IncapacidadesController');

    // todoList Routes
    app.route('/CargaIncapacidades')
        .post(IncapacidadesController.CargaIncapacidades);

    app.route('/DetalleIncapacidad')
        .post(IncapacidadesController.DetalleIncapacidad);

    app.route('/MantIncapacidades')
        .post(IncapacidadesController.MantIncapacidades);

    app.route('/MantDetalleIncapacidad')
        .post(IncapacidadesController.MantDetalleIncapacidad);

};