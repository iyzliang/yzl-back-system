var mongoose = require('mongoose'),
    db = require('./db');

// 数据库骨架
var accountScheam = new mongoose.Schema({
  username: String,
  password: String,
  regtime: Date
});
accountScheam.statics.findUser = function (user, callback) {
  return this.model('Account').find({username: user}, callback);
};

var accountModel = db.model('Account', accountScheam);

module.exports = accountModel;