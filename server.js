var express = require('express'),
	app = express();

app.env = 'dev';
app.port = process.env.PORT || 5000;

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.get('/', function (req, res) {
	console.log("Someone accessed me!");
	res.send('Hello there!');
});

app.listen(app.port, function () {
	console.log('Server running on ' + app.env + ' at ' + app.port + '.');
});