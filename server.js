var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

app.ENV = process.env.IS_PROD || false;

if (app.ENV) {
	app.PORT = process.env.PORT || 5000;
	app.DB_URL = process.env.DB_URL;
}
/*
else {
	var config = require('./config.js');
	app.PORT = config.PORT;
	app.CLIENT_SECRET = config.CLIENT_SECRET;
	app.CLIENT_ID = config.CLIENT_ID;
}; */



app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/website'));
app.use(express.static(__dirname + '/bower_components'));


var api = express.Router();


app.get('/', function (req, res) {
	console.log("Someone accessed me!");
	res.json({success: true, message: 'Olá, delícia!'});
});


app.use('/api', api);

app.get('/api', function (req, res) {
	res.json({success: true, message: 'Wellcome to the API'});
});


app.listen(app.PORT, function () {
	console.log('Server running on Production=' + app.ENV + ' at ' + app.PORT + '.');
});
