'use strict';

//database connect
var sql = require('mssql');

//Imports
var jsonConfig = require('../config');

//Global dependencies
var CORS = jsonConfig.CORSIp;

//Functions
exports.CargaParentesco = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('CODREL', sql.VARCHAR(30), "PARENTESCO")
	    .execute('SP_WEB_CARGA_CODIGOS')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.GuardaEncabezado = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('HCLUNI', sql.CHAR(36), req.body.HCLUNI)
        .input('HCLUNP', sql.CHAR(36), req.body.HCLUNP)
        .input('HCLUNM', sql.CHAR(36), req.body.HCLUNM)
        .input('HCLFPR', sql.VARCHAR(10), req.body.HCLFPR)//-->Fecha
        .input('HCLOBS', sql.VARCHAR(5000), req.body.HCLOBS)//-->Observaciones
        .input('USER', sql.VARCHAR(20), req.body.USER)
		.output('RESULTADO', sql.CHAR(1))
		.output('ID', sql.CHAR(36))
		.output('MENSAJE', sql.VARCHAR(300))
	    .execute('SP_MANT_HISTORIAL_INGRESO')
	    res.send(result.output);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.MantAntecedente = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('HLDUNI', sql.CHAR(36), req.body.HLDUNI)
        .input('HLDUNH', sql.CHAR(36), req.body.HLDUNH)
        .input('HLDFPR', sql.VARCHAR(10), req.body.HLDFPR)//-->Fecha
        .input('HLDPAR', sql.CHAR(1), req.body.TIPO)//-->SE AGREGA APARTE DE LO QUE INDICA EL DOCUMENTO, PARA SABER SI ES FAMILIAR (F) O PERSONAL (P)
        .input('HLDUNP', sql.CHAR(36), req.body.HLDUNP)
        .input('HLDTIP', sql.CHAR(1), req.body.HLDTIP)//--> ??? Mid(COMBOTIPOfamiliares.Text, 1, 1) / Mid(COMBOTIPOPERSONALES.Text, 1, 1) ???
        .input('HLDUNE', sql.CHAR(36), req.body.HLDUNE)
        .input('HLDUNM', sql.CHAR(36), req.body.HLDUNM)
        .input('HLDOBS', sql.VARCHAR(500), req.body.HLDOBS)//-->Observaciones
        .input('HLDPRI', sql.CHAR(1), req.body.HLDPRI)//-->Info Privada S/N
        .input('ACCION', sql.CHAR(1), req.body.ACCION)
        .input('USER', sql.VARCHAR(20), req.body.USER)
		.output('RESULTADO', sql.CHAR(1))
		.output('MENSAJE', sql.VARCHAR(300))
	    .execute('SP_MANT_HISTORIAL_INGRESO_DETALLE')
	    res.send(result.output);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};


exports.CargaAntecedentes = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('PERUNI', sql.CHAR(36), req.body.PERUNI)
        .input('HCLUNM', sql.CHAR(36), req.body.HCLUNM)
        .input('TIPO', sql.VARCHAR(1), req.body.TIPO)
	    .execute('SP_CONSULTA_ANTECEDENTES')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};


exports.CargaEncabezado = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('PERUNI', sql.CHAR(36), req.body.PERUNI)
	    .execute('SP_CONSULTA_ANTECEDENTES_ENCABEZADO')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};