'use strict';


//Imports
var jsonConfig = require('../config');
var nodemailer = require('nodemailer');

//Global dependencies
var CORS = jsonConfig.CORSIp;

var smtpTransport = nodemailer.createTransport({
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "rsolano2015095556@gmail.com",
       pass: "Fofo1213."
   }
   /*host: 'gator3183.hostgator.com',
   port: 465,
   secure: true, // use TLS
   tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
   },
   auth: {
       user: "dcr@infamedcr.com",
       pass: "Infamed18!"
   }*/
});


//Functions
exports.IncapacidadEmail = async function(req, res) {
	//Se debe cambiar la configuracion de permitir apps no seguras en gmail

	res.header("Access-Control-Allow-Origin", CORS);
	smtpTransport.sendMail({  //email options
	   from: "Equipo de Reportes DCR<rsolano2015095556@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
	   to: req.body.USRNAM + "<" + req.body.email + ">", // receiver
	   subject: "Reporte de Incapacidad DCR", // subject
	   text: "Adjunto se encuentra el reporte de la incapacidad en formato PDF. Gracias por preferirnos.", // body
	   attachments: [{
	       filename: 'InformeIncapacidad.pdf',
	       content: req.body.data,
	       encoding: 'base64'
	   }]
	}, function(error, response){  //callback
	   if(error){
	       console.log(error);
	       res.send(error);
	   }else{
	       console.log("Message sent: " + response.message);
	       res.send("Message sended");
	   }
	   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
	});
	
};