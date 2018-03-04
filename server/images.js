const MongoClient = require('mongodb').Client
	, assert =require('assert')

function images (db)=>{
	this.db=db.collection('imageAPI');

	this.insertImage = (myImage)=>{
		this.db.insertOne(myImage)
	}

	this.getImages=(numOfImagesEachTime,numOfTimeLoad)=>{
		this.db.find()
			.skip(numOfImagesEachTime*numOfTimeLoad)
			.limit(numOfImagesEachTime)
	}

	this.updateLike=(query,updatedLike)=>{
		this.db.update(query,
			{
				$set:{like:updatedLike}
			}
		)
	}

	this.updateComment=(query,comment)=>{
		this.db.update(query,
			{
				$push: {
					'comment':comment
				}
			}
		)
	}
}

module.exports.images =images