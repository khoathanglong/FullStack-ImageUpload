module.exports=(multer)=>{
	const storage= multer.diskStorage({
		destination: (req,file,cb)=>{cb(null,'upload/')},
		filename: (req,file,cb)=>{
			cb(null,+Date.now()+'&'+file.originalname)
		}
	})
	const fileFilter=(req,file,cb)=>{
		if (file.mimetype.includes('image')){
			cb(null,true)
		}else{
			cb(null,false)
		}
	}	
	const upload=multer({storage:storage,
					limits:{fileSize:1024*1024*10},
					fileFilter:fileFilter})

//upload.single(opts): opts must be the same with the name of input field 
return upload
}