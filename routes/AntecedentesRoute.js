'use strict';

module.exports = function (app) {
    //Calling the Controller	
    var AntecedentesController = require('../controllers/AntecedentesController');

    // todoList Routes
    app.route('/CargaParentesco')
        .post(AntecedentesController.CargaParentesco);

    app.route('/GuardaEncabezado')
        .post(AntecedentesController.GuardaEncabezado);

    app.route('/MantAntecedente')
        .post(AntecedentesController.MantAntecedente);

    app.route('/CargaAntecedentes')
        .post(AntecedentesController.CargaAntecedentes);

    app.route('/CargaEncabezado')
        .post(AntecedentesController.CargaEncabezado);

};