'use strict';

//database connect
var sql = require('mssql');

//Imports
var jsonConfig = require('../config');

//Global dependencies
var CORS = jsonConfig.CORSIp;

//Functions
exports.MantExamen = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('MODULO', sql.VARCHAR(10), "Registro")
		.input('CODIGO_OPCION', sql.VARCHAR(10), "RGT-01")
		.input('ACCION', sql.CHAR(1), req.body.ACCION)
		.input('USER', sql.VARCHAR(20), req.body.User)
		.input('EXAUNI', sql.CHAR(36), req.body.EXAUNI)
		.input('EXAUNP', sql.CHAR(36), req.body.EXAUNP)
		.input('EXAFPR', sql.VARCHAR(10), req.body.EXAFPR)
		.input('EXAPAA', sql.VARCHAR(30), req.body.EXAPAA)
		.input('EXAPUL', sql.VARCHAR(30), req.body.EXAPUL)
		.input('EXAAVI', sql.VARCHAR(30), req.body.EXAAVI)
		.input('EXAEST', sql.NUMERIC(10,2), req.body.EXAEST)
		.input('EXAPES', sql.NUMERIC(10,2), req.body.EXAPES)
		.input('EXAUNM', sql.CHAR(36), req.body.EXAUNM)
		.input('DEFUNO', sql.VARCHAR(5000), req.body.DEFUNO)
		.input('DEFDOS', sql.VARCHAR(5000), req.body.DEFDOS)
		.input('DEFTRE', sql.VARCHAR(5000), req.body.DEFTRE)
		.input('DEFCUA', sql.VARCHAR(5000), req.body.DEFCUA)
		.input('DEFCIN', sql.VARCHAR(5000), req.body.DEFCIN)
		.input('DEFSEI', sql.VARCHAR(5000), req.body.DEFSEI)
		.input('DEFSIE', sql.VARCHAR(5000), req.body.DEFSIE)
		.input('DEFOCH', sql.VARCHAR(5000), req.body.DEFOCH)
		.input('DEFNUE', sql.VARCHAR(5000), req.body.DEFNUE)
		.input('EXAPRI', sql.CHAR(1), req.body.EXAPRI)
		.output('RESULTADO', sql.CHAR(1))
		.output('MENSAJE', sql.VARCHAR(300))
	    .execute('SP_MANT_EXAMEN_FISICO')
	    res.send(result.output);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.ExamenesFisicos = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('exaunp', sql.CHAR(36), req.body.exaunp)
		.input('EXAUNM', sql.CHAR(36), req.body.EXAUNM)
	    .execute('SP_WEB_CONSULTA_EXAMEN_FISICO')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};