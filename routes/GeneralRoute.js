'use strict';

module.exports = function(app) {
  //Calling the Controller	
  var GeneralController = require('../controllers/GeneralController');

  // todoList Routes
  app.route('/Paises')
    .post(GeneralController.Paises);

  app.route('/Provincias')
  	.post(GeneralController.Provincias);

  app.route('/Cantones')
  	.post(GeneralController.Cantones);

  app.route('/Distritos')
  	.post(GeneralController.Distritos);

  app.route('/Referencias')
    .post(GeneralController.Referencias);

  app.route('/Departamentos')
    .post(GeneralController.Departamentos);

  app.route('/Registro')
    .post(GeneralController.Registro);
};