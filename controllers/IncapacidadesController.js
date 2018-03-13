'use strict';

//database connect
var sql = require('mssql');

//Imports
var jsonConfig = require('../config');

//Global dependencies
var CORS = jsonConfig.CORSIp;

//Functions
exports.CargaIncapacidades = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
        .input('INCUNP', sql.VARCHAR(36), req.body.INCUNP)
        .input('INCUNM', sql.VARCHAR(36), req.body.INCUNM)
	    .execute('SP_WEB_CONSULTA_INCAPACIDADES')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};


exports.DetalleIncapacidad = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
        .input('INCUNI', sql.VARCHAR(36), req.body.INCUNI)
	    .execute('SP_WEB_CONSULTA_INCAPACIDADES_DETALLE')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.MantIncapacidades = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
        .input('ACCION', sql.CHAR(1), req.body.ACCION)//-i = insertar, A = actualizar, E = eliminar
        .input('USER', sql.VARCHAR(20), req.body.USER)//--codigo de usuario
        .input('INCUNI', sql.CHAR(36), req.body.INCUNI)//--id incapacidad, '' cuando acción = I
        .input('INCUNP', sql.CHAR(36), req.body.INCUNP)//--PERUNI
        .input('INCUNM', sql.CHAR(36), req.body.INCUNM)//--USRUNI
        .input('INCFPR', sql.VARCHAR(10), req.body.INCFPR)//--fecha 
        .input('INCTIP', sql.CHAR(1), req.body.INCTIP)//--tipo incapacidad: M = medicina externa, E = emergencias
        .input('INCTIC', sql.CHAR(1), req.body.INCTIC)//--tipo externa: I = INS, C = CCSS
        .input('INCDIA', sql.Int, req.body.INCDIA)//--días de incapacidad
        .input('INCFDD', sql.VARCHAR(10), req.body.INCFDD)//--inicio incapacidad
        .input('INCFHT', sql.VARCHAR(10), req.body.INCFHT)//--final incapacidad
        .input('INCPRI', sql.CHAR(1), req.body.INCPRI)//--privado S/N
        .output('RESULTADO', sql.CHAR(1))//--resultado: S/N
        .output('MENSAJE', sql.VARCHAR(300))//--mensaje de retrono
        .output('INCUNI_OUT', sql.CHAR(36))//--id incapacidad
	    .execute('SP_MANT_INCAPACIDADES')
	    res.send(result.output);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};


exports.MantDetalleIncapacidad = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
        .input('ACCION', sql.CHAR(1), req.body.ACCION)//-i = insertar, A = actualizar, E = eliminar
        .input('USER', sql.VARCHAR(20), req.body.USER)//--codigo de usuario
        .input('DINUNI', sql.CHAR(36), req.body.DINUNI)//--id incapacidad, '' cuando acción = I
        .input('DINUND', sql.CHAR(36), req.body.DINUND)//--id de incapacidad
        .input('DINUNM', sql.CHAR(36), req.body.DINUNM)//--USRUNI
        .input('DINFPR', sql.VARCHAR(10), req.body.DINFPR)//--fecha 
        .input('DINUNE', sql.CHAR(36), req.body.DINUNE)//--id diagnóstico
        .input('DINOBS', sql.VARCHAR(5000), req.body.DINOBS)//--observaciones
        .output('RESULTADO', sql.CHAR(1))//--resultado: S/N
        .output('MENSAJE', sql.VARCHAR(300))//--mensaje de retrono
	    .execute('SP_MANT_DETALLE_INCAPACIDAD')
	    res.send(result.output);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};
