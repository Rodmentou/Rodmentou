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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


var api = express.Router();

app.get('/', function (req, res) {
	console.log("Someone accessed me!");
	res.send('Olá, delícia!');
});

app.use('/api', api);

app.listen(app.port, function () {
	console.log('Server running on ' + app.env + ' at ' + app.port + '.');
});
