var mongoose = require('mongoose');
var User = mongoose.model('User',
  {
    username: { type: String, unique: true, required: true},
    email: { type: String, required: true },
    password: { type: String, select: false, required: true}
  });

module.exports = mongoose.model('User', User);
