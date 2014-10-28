var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var auth = require('./auth');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({ 
	secret: 'key',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/login', function(req,res) { res.render('login'); });
app.post('/login', passport.authenticate('local'), function(req,res){
	var userId= req.user.id;
	 res.redirect('/user/' + userId);
});
app.get('/user/:userId', auth.check, function(req, res){
	var userId= req.user.id;
	res.render('user', {userId:userId});
});
app.get('/', function(req,res) {  
	res.render('index', {
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});
app.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
});

app.listen(3000, function() { console.log('Listening on 3000'); });
