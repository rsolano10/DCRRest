'use strict';

//database connect
var sql = require('mssql');

//Imports
var jsonConfig = require('../config');

//Global dependencies
var CORS = jsonConfig.CORSIp;

//Functions
exports.Login = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//Configure the session parameter
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('USRPWD', sql.VARCHAR(20), req.body.Password)
	    .input('USRCOD', sql.VARCHAR(20), req.body.User)
	    .output('USRNAM', sql.VARCHAR(160))
	    .output('USRUNI', sql.CHAR(36))
	    .output('MENSAJE', sql.VARCHAR(300))
	    .output('USRCOM', sql.VARCHAR(30))
	    .execute('SP_VALIDAR_USUARIO_DCRWEB')
	    res.send(result.output);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.LoadEmpresas = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;
		
		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('USRUNI', sql.CHAR(36), req.body.USRUNI)
	    .execute('SP_CARGAR_EMPRESAS_USUARIO')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}
};

exports.Buscar = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;
		
		//Login Connection
	    let pool = await sql.connect(sqlConfig)
	    let result = await pool.request()
	    .input('USRUNI', sql.CHAR(36), req.body.USRUNI)
	    .input('EMPUNI', sql.CHAR(36), req.body.EMPUNI)
	    .input('PERIDE', sql.VARCHAR(30), req.body.PERIDE)
	    .input('PEREXP', sql.VARCHAR(30), req.body.PEREXP)
	    .input('PERNSS', sql.VARCHAR(30), req.body.PERNSS)
	    .input('PERNOM', sql.VARCHAR(30), req.body.PERNOM)
	    .input('PERAP1', sql.VARCHAR(30), req.body.PERAP1)
	    .input('PERAP2', sql.VARCHAR(30), req.body.PERAP2)
	    .execute('SP_WEB_CONSULTA_PACIENTES')
	    res.send(result.recordsets[0]);
	}
	catch (err) {
	    res.send(err);
	}
	finally{
	    sql.close();
	}

};

exports.CargarPaciente = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;
		
		//Login Connection
		let pool = await sql.connect(sqlConfig)
		let result = await pool.request()
		.input('PERUNI', sql.CHAR(36), req.body.PERUNI)
		.execute('SP_WEB_CARGAR_PACIENTE')
		res.send(result.recordsets[0]);
	}
	catch (err) {
		res.send(err);
	}
	finally{
		sql.close();
	}
};

exports.GuardarPaciente = async function(req, res) {
	res.header("Access-Control-Allow-Origin", CORS);
	try {
		//String de Conexion
		var sqlConfig = jsonConfig.sqlConfig;
		sqlConfig.database = "DCR_" + req.body.Code;

		//Image Management
		var imagebuffer;
		try{
			if(req.body.PERIMG){
			imagebuffer = new Buffer(req.body.PERIMG, 'base64');
			}
			else{
			imagebuffer = null;
			}
		}catch(error){
			imagebuffer = null;
		}
		
		
		//Login Connection
		let pool = await sql.connect(sqlConfig)
		let result = await pool.request()
		.input('MODULO', sql.VARCHAR(10), "Registro")
		.input('CODIGO_OPCION', sql.VARCHAR(10), "RGT-01")
		.input('ACCION', sql.CHAR(1), req.body.ACCION)
		.input('USER', sql.VARCHAR(20), req.body.User) //Codigo de usuario ejm: Admin;
		.input('PERUNI', sql.CHAR(36), req.body.PERUNI) //Solo cuando accion es Actualizar o Borrar
		.input('PERCOD', sql.VARCHAR(30), req.body.PERCOD)
		.input('PERIDE', sql.VARCHAR(30), req.body.PERIDE)
		.input('PERTID', sql.CHAR(1), req.body.PERTID)
		.input('PERNOM', sql.VARCHAR(50), req.body.PERNOM)
		.input('PERAP1', sql.VARCHAR(50), req.body.PERAP1)
		.input('PERAP2', sql.VARCHAR(50), req.body.PERAP2)
		.input('PERSEX', sql.CHAR(1), req.body.PERSEX)
		.input('PERTIT', sql.VARCHAR(10), "")
		.input('PEREXP', sql.VARCHAR(30), req.body.PEREXP)
		.input('PERTEL', sql.VARCHAR(20), req.body.PERTEL)
		.input('PERTCE', sql.VARCHAR(20), req.body.PERTCE)
		.input('PERTEO', sql.VARCHAR(20), req.body.PERTEO)
		.input('PERTOT', sql.VARCHAR(20), req.body.PERTOT)
		.input('PERNSS', sql.VARCHAR(30), req.body.PERNSS)
		.input('PERUNN', sql.CHAR(36), req.body.PERUNN)
		.input('PERUNP', sql.CHAR(36), req.body.PERUNP)
		.input('PERUNC', sql.CHAR(36), req.body.PERUNC)
		.input('PERUND', sql.CHAR(36), req.body.PERUND)
		.input('PERDIR', sql.VARCHAR(300), req.body.PERDIR)
		.input('PERFNA', sql.DATE, req.body.PERFNA)
		.input('PERCIV', sql.CHAR(1), req.body.PERCIV)
		.input('PEROCU', sql.VARCHAR(100), req.body.PEROCU)
		.input('PERESC', sql.VARCHAR(100), req.body.PERESC)
		.input('PEROBS', sql.VARCHAR(1000), req.body.PEROBS)
		.input('PEREML', sql.VARCHAR(100), req.body.PEREML)
		.input('PERIMG', sql.IMAGE, imagebuffer)
		.input('EMPUNI', sql.CHAR(36), req.body.EMPUNI)
		.input('PERUNR', sql.CHAR(36), req.body.PERUNR)
		.input('PERUNT', sql.CHAR(36), req.body.PERUNT)
		.input('PERWAP', sql.CHAR(1), "N")
		.output('RESULTADO', sql.CHAR(1))
		.output('MENSAJE', sql.VARCHAR(300))
		.output('UNI', sql.CHAR(36))
		.output('EXISTE', sql.CHAR(1))
		.execute('SP_MANT_PERSONA_V2')
		res.send(result.output);
	}
	catch (err) {
		res.send(err);
	}
	finally{
		sql.close();
	}
};