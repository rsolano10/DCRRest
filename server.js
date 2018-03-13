// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');

// configure app to use bodyParser()
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors({origin: '*'}));

// set our port
var port = process.env.PORT || 3000;

//Routes-------------------------------------------
var UserRoute = require('./routes/UserRoute');
UserRoute(app);

var GeneralRoute = require('./routes/GeneralRoute');
GeneralRoute(app);

var EvolucionRoute = require('./routes/EvolucionMedicaRoute');
EvolucionRoute(app);

var ExamenesRoute = require('./routes/ExamenFisicoRoute');
ExamenesRoute(app);

var AntecedentesRoute = require('./routes/AntecedentesRoute');
AntecedentesRoute(app);

var IncapacidadesRoute = require('./routes/IncapacidadesRoute');
IncapacidadesRoute(app);

var ImagenesRoute = require('./routes/ImagenesMedicasRoute');
ImagenesRoute(app);

var EmailRoute = require('./routes/EmailRoute');
EmailRoute(app);
//--------------------------------------------------

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started at port: ' + port);