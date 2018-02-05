const path=require('path')
	, bodyParser= require('body-parser')
	, morgan= require('morgan')
	, express=require('express')

module.exports= (app)=>{
	app.use(morgan('dev'));
	app.use(bodyParser());
	app.use('/upload',express.static('upload'))
	return app
}