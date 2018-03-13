'use strict';

module.exports = function(app) {
  //Calling the Controller	
  var EvolucionController = require('../controllers/EvolucionMedicaController');

  // todoList Routes
  app.route('/Evoluciones')
    .post(EvolucionController.Evoluciones);

  app.route('/MantEvolucion')
    .post(EvolucionController.MantEvolucion);

  app.route('/Diagnosticos')
    .post(EvolucionController.Diagnosticos);

  app.route('/BuscarDiagnostico')
    .post(EvolucionController.BuscarDiagnostico);

};