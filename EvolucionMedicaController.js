'use strict';

//database connect
var sql = require('mssql');

//Imports
var jsonConfig = require('../config');

//Global dependencies
var CORS = jsonConfig.CORSIp;

//Functions
exports.Evoluciones = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('EVMUNP', sql.CHAR(36), req.body.EVMUNP)
	    .input('EVMUNM', sql.CHAR(36), req.body.EVMUNM)
	    .execute('SP_CONSULTA_EVOLUCION_MEDICA')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};
exports.MantEvolucion = async function(req, res) {
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
		.input('EVMUNI', sql.CHAR(36), req.body.EVMUNI)
		.input('EVMUNP', sql.CHAR(36), req.body.EVMUNP)
		.input('EVMUNM', sql.CHAR(36), req.body.EVMUNM)
		.input('EVMFPR', sql.VARCHAR(10), req.body.EVMFPR)
		.input('EVMANO', sql.VARCHAR(5000), req.body.EVMANO)
		.input('EVMMED', sql.VARCHAR(5000), req.body.EVMMED)
		.input('EVMUNE', sql.CHAR(36), req.body.EVMUNE)
		.input('DEMUNI', sql.CHAR(36), req.body.DEMUNI)
		.input('EVMPRI', sql.CHAR(1), req.body.EVMPRI)
		.output('EVMUNI_OUT', sql.CHAR(36))
		.output('RESULTADO', sql.CHAR(1))
		.output('MENSAJE', sql.VARCHAR(300))
	    .execute('SP_MANT_EVOLUCION_MEDICA')
	    res.send(result.output);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.Diagnosticos = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('EVMUNI', sql.CHAR(36), req.body.EVMUNI)
	    .execute('SP_CONSULTA_DIAGNOSTICOS_EV')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.BuscarDiagnostico = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('codigo', sql.CHAR(4), req.body.codigo)
	    .input('descripcion', sql.VARCHAR(100), req.body.descripcion)
	    .query("SELECT ENFUNI, ENFCOD, ENFDSC, DENUNI, DENCOD,DENDSC FROM FTN_WEB_DESPLEGAR_DIAGNOSTICOS('GN',@codigo,@descripcion)")
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};