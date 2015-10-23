var express = require('express'),
	app = express();

var env = 'dev';
app.port = 5000;

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.get('/', function (req, res) {
	res.send('Hello there!');
});

app.listen(app.port, function () {
	console.log('Server running on ' + env + ' at ' + app.port + '.');
});