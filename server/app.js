var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    expressJWT = require('express-jwt'),
    session = require('express-session'),
    routes = require('./router/index'),
    app = express(),
    secretOrPrivateKey = "Yzliang";

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'love',
  resave: false,
  saveUninitialized: true
}));

app.use(expressJWT({
  secret: secretOrPrivateKey   
}).unless({
  path: ['/api/login', '/frontend/']  //除了这个地址，其他的URL都需要验证
}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {   
      //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    res.status(401).send(err);
  }else{
    next();
  }
});

app.use('/api', routes);

app.use('/frontend', express.static('./view'));
app.listen(3000);