const express= require('express');
const serverApp = express();
const config = require('./config');
const app = config(serverApp)
const multer=require('multer')
const upload=require('./upload')
const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const url= 'mongodb://localhost:27017';
const imagedb='ImageUpload';
const visitdb="visitCounter"
const myCollection='imageAPI'
const localhost="localhost:3001"
MongoClient.connect(url,(err,client)=>{
	assert.equal(null,err);
	console.log('server connected');
	const db=client.db(imagedb);
	//handle /upload post

	app.post('/upload', upload(multer).single('imageFile'),(req,res,next)=>{
		console.log('upload successfully')
		let endpoint=req.file.path
		console.log(req.file)
		let imageObject={
			filename:req.file.filename,
			title:req.body.title,
			description:req.body.description,
			url:'http://'+localhost+'/'+endpoint,
			date: '22-12-2017',
			like:0,
			view:10,
			comment:[
				// 	{ 
				// 	date:0,
				// 	name:'',
				// 	avatar:'',
				// 	comment:'',
				// }
			]
		}
		db.collection(myCollection).insertOne(imageObject,()=>{
			res.json(imageObject)
		})
	});
	//handle get /api/images
	app.get('/api/images',(req,res,next)=>{
		db.collection(myCollection).find({_id:{$ne:"views counter"}}).toArray((err,result)=>{
			assert.equal(null,err);
			res.json(result)
		})

	})
	app.get('/api/visits',(req,res,next)=>{
		db.collection(visitdb).updateOne(
			{_id:'views counter'},//each time the COMPONENT is rendered counted as a visit
			{$inc:{visits:1}},
			{upsert:true},
		).then(db.collection(visitdb).find({}).toArray((err,result)=>{
			assert.equal(null,err);
			res.json(result[0])
		})
		)
	})

	//handle like and comment post
	app.post('/image/:id/comment',(req,res,next)=>{//not tested yet
		db.collection(myCollection).findByIdAndUpdate(req.params.id,
			{$push:{
				comment:{
					avatar:'avatar.jpg',
					name:'super man',
					comment:req.body.comment,
					date:0
				}
			}}
		)
	})
	app.post('/image/:id/like',(req,res,next)=>{
		db.collection(myCollection).findByIdAndUpdate(req.params.id,{
			$inc:{like:1}
		})
	})

})//outer brace


//not handle POST /updateImageDetail
app.listen(3001)

