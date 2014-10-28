var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var passportLocal = require('passport-local');

passport.use(new passportLocal.Strategy(function(username, password, done) {
	if (username === 'admin' && password === 'pass') { 
		done(null, { id: username, name: username }); 
	} else {
		done(null, null);
	}
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	done(null, {id: id, user: id})
});

exports.check = function(req, res, next) {
	if (req.isAuthenticated()) { 
		if (req.user.id == req.params.userId ) { next(); }	
		else { res.redirect('/user/' + req.user.id); }
	}
	else { res.redirect('/login'); }
}

