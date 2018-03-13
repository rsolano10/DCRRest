'use strict';

//database connect
var sql = require('mssql');

//Imports
var jsonConfig = require('../config');

//Global dependencies
var CORS = jsonConfig.CORSIp;

//Functions
exports.ClasificacionImagenes = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('CODREL', sql.VARCHAR(30), "CLASIFICACIÓN IMÁGENES MÉDICAS")
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

exports.RegionImagenes = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('CODREL', sql.VARCHAR(30), "REGIÓN IMÁGENES MÉDICAS")
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

exports.DocumentosMedicos = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('EXGUNP', sql.CHAR(36), req.body.EXGUNP)
	    .input('EXGTIP', sql.CHAR(36), "X")
	    .execute('SP_WEB_CARGAR_DOCUMENTOS_MEDICOS')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.CargarMedia = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('EXGUNI', sql.CHAR(36), req.body.EXGUNI)
	    .execute('SP_WEB_CARGA_IMAGEN')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.MantGabinete = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;
		var Bufferimg;
		if(req.body.EXGIMG){
			Bufferimg = new Buffer(req.body.EXGIMG, 'base64');
		}
		else{
			Bufferimg = null;
		}
		

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('MODULO', sql.VARCHAR(10), 'REGISTRO')
	    .input('CODIGO_OPCION', sql.VARCHAR(10), 'EXP-01')
	    .input('ACCION', sql.CHAR(1), req.body.ACCION)
	    .input('USER', sql.VARCHAR(20), req.body.USER)
	    .input('EXGUNI', sql.CHAR(36), req.body.EXGUNI)
	    .input('EXGUNP', sql.CHAR(36), req.body.EXGUNP)
	    .input('EXGUNM', sql.CHAR(36), req.body.EXGUNM)
	    .input('EXGFPR', sql.VARCHAR(10), req.body.EXGFPR)
	    .input('EXGTIP', sql.CHAR(1), 'X')
	    .input('EXGDTE', sql.VARCHAR(5000), req.body.EXGDTE)
	    .input('EXGDTO', sql.VARCHAR(50), '')
	    .input('EXGTAR', sql.VARCHAR(10), req.body.EXGTAR)
	    .input('EXGCOC', sql.CHAR(36), req.body.EXGCOC)
	    .input('EXGCOR', sql.CHAR(36), req.body.EXGCOR)
	    .input('EXGIMG', sql.IMAGE, Bufferimg)
	    .input('EXGPRI', sql.CHAR(1), 'N')
	    .output('RESULTADO', sql.CHAR(1))
	    .output('MENSAJE', sql.VARCHAR(300))
	    .execute('SP_MANT_EXAMENES_GABINETE')
	    res.send(result.output);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};