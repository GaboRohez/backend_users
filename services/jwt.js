'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'boop-beep-boop';

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    created_at: user.created_at,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix
  };

  return jwt.encode(payload, secret);
}
