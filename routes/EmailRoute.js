'use strict';

module.exports = function (app) {
  //Calling the Controller	
  var EmailController = require('../controllers/EmailController');

  // todoList Routes
  app.route('/IncapacidadEmail')
    .post(EmailController.IncapacidadEmail);
};