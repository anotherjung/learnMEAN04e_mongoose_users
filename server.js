// require the path module
var path = require("path");
// require express and create the express app
var express = require("express");
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
// static content
app.use(express.static(path.join(__dirname, "./static")));
// set the views folder and set up ejs
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//#1a ad db before routs
//require mongoose module, create an object
var mongoose = require('mongoose');
//#1b tell mongoose where the mongo db is
mongoose.connect('mongodb://localhost/basic_mongoose');

//#2a create Schema, named User
var UserSchema = new mongoose.Schema({
	name: String,
	color: String
})
//#2b create object for Schema, TIP: number is practice
var User = mongoose.model('User1', UserSchema);

// root route
app.get('/', function(req, res) {
 // This is where we would get the users from the database and send them to the index view to be displayed.
 //#3c read all
 User.find({}, function(err, users) {
 	console.log("3c find all", users)
 	//#3d reload index, and return key-value pair object as data
 	res.render('index', {users:users});
 })
})
// route to add a user
app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 // This is where we would add the user from req.body to the database.
 //#3 CRUD
 //#3a create a new user object that will look in the request
 var user = new User({name: req.body.name, color: req.body.color});
 //#3b save data, callback will handles err
 user.save(function(err) {
 	if(err) {
 		console.log('3b err save', req.body);
 	} else {
 		console.log('3b yo babyd', req.body);
 		//#3b reload page for UX
 		res.redirect('/');
 	}
 })//ends user.save
})


// listen on 8000
app.listen(8000, function() {
 console.log("yo baby! on port 8000");
})