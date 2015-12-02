var	mongoose = require('mongoose');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var jwtSecret = 'Lu@N4E$$12R0dRlGu';

module.exports = function (api) {

  api.post('/signup', function (req, res) {
    var newUser = new User(req.body);
    console.log(newUser);
    console.log(newUser.username);

    if (newUser.username && newUser.password) {
      newUser.save( function (err, data) {
        if (err) {
          res.json({success: false, message: 'Error on signup'});
        } else {
          data.password = null;
          var token = createNewToken(data.username, jwtSecret);
          res.json({success: true, user: data, token: token});
        }
      });
    } else {
      res.json({success: false, message: 'Need to provide username and password'});
    }

  });

  api.post('/signin', function (req, res) {
    var user = req.body;

    if (user.username && user.password) {
      User.find(user, function (err, data) {
        if (err) res.json({success: false, message: 'Ooops... is everything right?'});

        var token = createNewToken(user.username, jwtSecret);
        res.json({user: data, token: token});
      });
    } else {
      res.json({success: false, message: 'You need to provide both username and password'});
    }



  });


  var createNewToken = function(username, jwtSecret) {
		return jwt.sign({
			username: username
		}, jwtSecret, {
			expiresIn: 360000
		});
	}

}
