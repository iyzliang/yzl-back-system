var mongoose = require('mongoose'),
    db = require('./db');

// 数据库骨架
var tagScheam = new mongoose.Schema({
  tag: String,
  date: Date,
  accountid: String
});

var tagModel = db.model('Tag', tagScheam);

module.exports = tagModel;