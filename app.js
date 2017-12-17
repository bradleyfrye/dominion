var express = require('express');
var app = express();
var router = require("./routes/router");
var path = require('path');

app.listen(3000, function(){
	console.log('Listening on 3000');
});

app.set('views', path.join(__dirname, 'build')); // tell express to look for views in build folder
app.set('view engine', 'jade'); // use jade view engine
app.use(express.static(path.join(__dirname, 'build'))); // exposes /build folder to http requests

/*
app.get('/', function(req, res){
	res.send("hey, what's up? welcome to the site ;) <a href='/abc'>link here </a>");
});
*/

// send app to router
router(app);

module.exports = app;