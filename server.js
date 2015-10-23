var express = require('express'),
	app = express();

var env = 'dev';
var port = 80;

app.get('/', function (req, res) {
	res.send('Hello there!');
});

app.listen(port, function () {
	console.log('Server running on ' + env + ' at ' + port + '.');
});