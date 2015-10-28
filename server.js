var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	jwt = require('express-jwt');

app.ENV = 'dev';
app.PORT = process.env.PORT || 5000;
//app.JWT_SECRET = process.env.JWT_SECRET || {};
app.DB_URL = process.env.DB_URL || {};
app.CLIENT_SECRET = process.env.CLIENT_SECRET || {};
app.CLIENT_ID = process.env.CLIENT_ID || {};


app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


var api = express.Router();

var jwtCheck = jwt({
	secret: new Buffer(CLIENT_SECRET, 'base64'),
	audience: CLIENT_ID
});

app.get('/', function (req, res) {
	console.log("Someone accessed me!");
	res.send('Olá, delícia!');
});

app.use('/api', jwtCheck);
app.use('/api', api);

app.listen(app.PORT, function () {
	console.log('Server running on ' + app.ENV + ' at ' + app.PORT + '.');
});
