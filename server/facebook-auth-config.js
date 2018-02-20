const FacebookAppID='your id'
	, FacebookAppSecret='your clientSecret'
	, passport = require('passport')
	, FacebookStrategy=require('passport-facebook')

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

	console.log(profile.photos[0].value)
	done(null,profile)

}
module.exports= passport.use(new FacebookStrategy(Opts,facebookCB))

