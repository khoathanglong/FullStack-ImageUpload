const FacebookAppID='2009414815986385'
	, FacebookAppSecret='876685892d1d91719d96acc184b99768'
	//, passport = require('passport')
	, FacebookStrategy=require('passport-facebook')
	, usersData =  require('./users').users; //get the users object in general
module.exports= (passport, db)=>{
	const Opts={
		clientID:FacebookAppID,
		clientSecret:FacebookAppSecret,
		callbackURL:'http://localhost:3001/auth/facebook/callback',
		profileFields : ['id', 'email', 'name','picture.type(large)']
	};
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});	

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});
	const facebookCB=(accessToken,refreshToken,profile,done)=>{
		let userProfile={//make sure userProfile object similar to that in users.js
			_id:profile._json.id,
			email:profile._json.email,
			name:profile._json.first_name+' '+profile._json.last_name,
			picture:profile.photos[0].value
		};
		let users= new usersData(db); //get an instance 
		if (!users.isExisted(profile.id,()=>{
			users.addNewUser(userProfile)//if user not existed, add a new one in the callback
			})
		) 
		done(null,userProfile)
		
	}
	passport.use(new FacebookStrategy(Opts,facebookCB))
}
