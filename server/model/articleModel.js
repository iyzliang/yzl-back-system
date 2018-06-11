var mongoose = require('mongoose'),
    db = require('./db');

// 数据库骨架
var articleScheam = new mongoose.Schema({
  image: String,
  title: String,
  tags: Array,
  isshow: Boolean,
  description: String,
  article: String,
  date: Date
});

var articleModel = db.model('Article', articleScheam);

module.exports = articleModel;