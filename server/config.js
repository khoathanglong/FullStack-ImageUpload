const path=require('path')
	, bodyParser= require('body-parser')
	, morgan= require('morgan')
	, express=require('express')
	,passport=require('passport')
	, Facebook_Strategy_Config=require('./facebook-auth-config.js')
	//import Facebook_Strategy_Config to make sure everything in facebook-auth-config runs
	//if not they won't run
	//otherwise simply copy codes in that file here


module.exports= (app)=>{
	app.use(morgan('dev'));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(bodyParser());
	app.use('/upload',express.static('upload'))
	return app
}