var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://blog:yzl548776178@localhost:27017/blogDB', { "authSource": "blogDB" });

db.on('err', console.error.bind(console, '连接错误:'));
db.once('open', () => {
	console.log('连接成功');
});

module.exports = db;
