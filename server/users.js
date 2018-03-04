const MongoClient =require('mongodb').Client,
		assert =require('assert')

 function users(db){
	this.db = db;

	this.addNewUser = (newUser)=>{
		this.db.collection('users').insertOne(newUser)
	}

	this.isExisted =(id,callback)=>{
		this.db.collection('users').findOne({_id:id}, (err, result)=>{
			if (err) {assert(null,err)}
			if (result) {
				return true
			}else{
				callback
			}
			
		})
	}


}

module.exports.users=users