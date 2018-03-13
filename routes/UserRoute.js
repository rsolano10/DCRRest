'use strict';

module.exports = function (app) {
  //Calling the Controller	
  var UserController = require('../controllers/UserController');

  // todoList Routes
  app.route('/Login')
    .post(UserController.Login);

  app.route('/EmpresasUsuario')
    .post(UserController.LoadEmpresas);

  app.route('/BuscarCliente')
    .post(UserController.Buscar);

  app.route('/CargarPaciente')
    .post(UserController.CargarPaciente);

  app.route('/GuardarPaciente')
    .post(UserController.GuardarPaciente);
};