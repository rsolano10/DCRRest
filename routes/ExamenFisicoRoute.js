'use strict';

module.exports = function(app) {
  //Calling the Controller	
  var ExamenController = require('../controllers/ExamenFisicoController');

  // todoList Routes
  app.route('/MantExamen')
    .post(ExamenController.MantExamen);

  app.route('/ExamenesFisicos')
    .post(ExamenController.ExamenesFisicos);

};