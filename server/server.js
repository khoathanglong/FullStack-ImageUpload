const express= require('express');
const serverApp = express();
const config = require('./config');
const app = config(serverApp)
const multer=require('multer')
const upload=require('./upload')
const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const url= 'mongodb://localhost:27017';
const imagedb='ImageUploadCollection';
const visitdb="visitCounterCollection"//separate collection for statics
const myCollection='imageAPI'
const localhost="localhost:3001"
const ObjectId=require('mongodb').ObjectID
const passport = require('passport')

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

	});
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
	});

	app.post('/image/updateLike',(req,res,next)=>{
		let query = {_id:ObjectId(req.body._id)}
		console.log(req.body)
		db.collection(myCollection).updateOne(
			query,
			{
				$set:{like:req.body.like}
			}
		)
	});
	app.post('/image/updateComment',(req,res,next)=>{
		let query = {_id:ObjectId(req.body._id)}
		console.log(req.body)
		db.collection(myCollection).update(query,
		{
			$push:{
				"comment":{
					'comment':req.body.comment,
					'name':req.body.name,
					'avatar':req.body.avatar,
					'date':req.body.date
				}
			}
		})
	});


	app.get('/',passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
	}));

	app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/failAuthen'
        }));
	app.get('/profile',(req,res)=>{
		res.send('hello')
	})
})//outer bracket
app.listen(3001)

