var router = require('express')
	.Router(),
	svgCaptcha = require('svg-captcha'),
	crypto = require('crypto'),
	jwt = require('jsonwebtoken'),
	formidable = require('formidable'),
	path = require('path'),
	fs = require('fs'),
	mongoID = require('mongodb')
	.ObjectID,
	secretOrPrivateKey = "Yzliang",
	upload = require('../model/upload'),
	accountModel = require('../model/accountModel'),
	tagModel = require('../model/tagsModel'),
	articleModel = require('../model/articleModel');

function md5hex(code) {
	return crypto.createHash('md5')
		.update(code)
		.digest('hex');
}

function setToken(code) {
	return jwt.sign(code, secretOrPrivateKey, {
		expiresIn: 60 * 60 * 2
	});
}

// 获取验证码
router.get('/captcha', (req, res) => {
	let captcha = svgCaptcha.create({ fontSize: 50, width: 100 });
	req.session.captcha = captcha.text.toLowerCase();
	res.setHeader('Content-Type', 'image/svg+xml');
	res.write(String(captcha.data));
	res.end();
});

// 注册
router.post('/register_blog', (req, res) => {
	let body = req.body;
	if (body.proof) {
		req.session.captcha == body.proof ? "" : res.json({ "status": "error", "code": "验证码不正确" });
	} else {
		res.json({ "status": "error", "code": "验证码不为空" });
	}
	if (!body.username || !body.password) {
		res.json({ "status": "error", "code": "参数错误" });
	} else {
		accountModel.findUser(body.username, (err, result) => {
			if (err) {
				res.json({ "status": "error", "code": "查询错误", "err": err });
			} else {
				if (result && result.length == 0) {
					(new accountModel({ username: body.username, password: md5hex(body.password), regtime: (new Date())
							.getTime() }))
					.save((err, r) => {
						if (err) {
							res.json({ "status": "error", "code": "插入数据库失败" });
						} else {
							res.json({ "status": "ok", "code": "成功" });
						}
					})
				} else {
					res.json({ "status": "error", "code": "用户名已存在" })
				}
			}
		})
	}
})

// 登录
router.post('/login_blog', (req, res) => {
	let body = req.body;

	if (!body.username || !body.password) {
		res.json({ "status": "error", "code": "参数错误"});
	} else {
		accountModel.findUser(body.username, (err, result) => {
			if (err) {
				res.json({ "status": "error", "code": "查询错误", "err": err });
			} else {
				if (result && result.length > 0) {
					if (result[0].password == md5hex(body.password)) {
						res.json({ "status": "ok", "token": setToken({ username: body.username }), "username": body.username });
					} else {
						res.json({ "status": "error", "code": "密码错误" });
					}
				} else {
					res.json({ "status": "error", "code": "用户名不已存在" });
				}
			}
		})
	}
})

// 添加文章/修改文章
router.post('/article_blog', (req, res) => {
	let body = req.body;
	if (body.image && body.title && body.description && body.isshow != undefined && body.article && body.date) {
		if (body.id) {
      articleModel.findOneAndUpdate({_id: body.id}, {
        image: body.image,
        title: body.title,
        tags: body.tags,
        isshow: body.isshow,
        description: body.description,
        article: body.article,
        date: body.date}, (err, result) => {
					if(err) {
						res.json({"status": "error", "code": "更新数据库失败"}) 
					} else {
						res.json({"status": "ok", "code": "成功"})
					}
				})
		} else {
			accountModel.findUser(req.user.username, (err, result) => {
				if (err) {
					res.json({ "status": "error", "code": "查询错误", "err": err });
				} else {
          (new articleModel({
            image: body.image,
            title: body.title,
            tags: body.tags,
            isshow: body.isshow,
            description: body.description,
            article: body.article,
            date: body.date,
            accountid: result[0]._id
          })).save((err, r) => {
            if (err) {
              res.json({"status": "error", "code": "插入数据库失败"})
            } else {
              res.json({"status": "ok", "code": "添加成功"});
            }
          })
				}
			})
		}
	} else {
		res.json({ "status": "error", "code": "参数不正确" });
	}
});

router.get('/article_blog', (req, res) => {
  if(req.query.id) {
    articleModel.findById(req.query.id, (err, result) => {
      if(err) {
        res.json({ "status": "error", "code": "查询错误" })
      } else {
        res.json({ "status": "ok", "code": "成功", "data": result })
      }
    })
  } else {
    res.json({ "status": "error", "code": "参数不正确" });
  }
})

router.delete('/article_blog', (req, res) => {
  if(req.body.id) {
    articleModel.findByIdAndDelete(req.body.id, (err, result) => {
      if(err) {
        res.json({ "status": "error", "code": "删除失败" });
      } else {
        res.json({ "status": "ok", "code": "成功", "data": result});
      }
    })
  } else {
    res.json({ "status": "error", "code": "参数不正确" });
  }
})

// 获取文章列表
router.get('/article_list_blog', (req, res) => {
  let page = req.query.page || 1;
  accountModel.findUser(req.user.username, (err, result) => {
    if (err) {
      res.json({ "status": "error", "code": "查询错误", "err": err });
    } else {
			var finddata = {"accountid": result[0]._id};
			if(req.query.qtype && req.query.q) {
				finddata[req.query.qtype] =  {'$regex': req.query.q, $options: '$i'};
			}
      articleModel.count(finddata, (err, count) => {
        if(err) {
          res.json({"status": "error", "code": "查询失败"}) 
        } else {
          articleModel.find(finddata)
          .skip((page-1) * 10)
          .limit(10)
          .exec(
            (err, r) => {
              if (err) {
                res.json({"status": "error", "code": "查询失败"})
              } else {
                var data = {"status": "ok", "code": "成功", "data": [], "total": count};
                if(r.length > 0) {
                  r.forEach((item, index) => {
                    data.data.push({
                      title: item.title,
                      tags: item.tags,
                      isshow: item.isshow,
                      description: item.description,
                      date: item.date,
                      id: item._id,
                      numofviews: item.numofviews || 0
                    });
                  })
                }
                res.json(data);
              }
            }
          );

        }

      })
    }
  })
})

router.post('/tag_blog', (req, res) => {
	let body = req.body;
	if(body.tagname) {
		accountModel.findUser(req.user.username, (err, result) => {
			if (err) {
				res.json({ "status": "error", "code": "查询错误", "err": err });
			} else {
				tagModel.find({tag: body.tagname}, (err, r) => {
					if(err){
						res.json({ "status": "error", "code": "查询错误", "err": err });
					} else {
						if (r.length > 0) {
							res.json({ "status": "error", "code": "标签已存在" });
						} else {
							(new tagModel({
								tag: body.tagname,
								date: (new Date()).getTime(),
								accountid: result[0]._id
							})).save((err, r) => {
								if (err) {
									res.json({"status": "error", "code": "插入数据库失败"})
								} else {
									res.json({"status": "ok", "code": "添加成功"});
								}
							})
						}
					}
				})
			}
		})
	} else {
		res.json({ "status": "error", "code": "参数不正确" });
	}
})

router.get('/tag_blog', (req, res) => {
	accountModel.findUser(req.user.username, (err, result) => {
    if (err) {
      res.json({ "status": "error", "code": "查询错误", "err": err });
    } else {
			var finddata = {"accountid": result[0]._id};
			tagModel.find(finddata, (err, r) => {
				if(err) {
					res.json({ "status": "error", "code": "查询错误", "err": err });
				} else {
					res.json({ "status": "ok", "code": "成功", "data": r });	
				}
			})
    }
  })	
})

router.delete('/tag_blog', (req, res) => {
	if(req.body.id) {
    tagModel.findByIdAndDelete(req.body.id, (err, result) => {
      if(err) {
        res.json({ "status": "error", "code": "删除失败" });
      } else {
        res.json({ "status": "ok", "code": "成功", "data": result});
      }
    })
  } else {
    res.json({ "status": "error", "code": "参数不正确" });
  }

})
// 图片上传
router.post('/upload', (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = "./images";
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.json({ "status": "error", "code": "上传失败" });
    } else {
			console.log("-----",files);
      var extname = path.extname(files.file.name);
      var newname = __dirname.split('/');
      newname.pop();
      newname = newname.join('/');
      var oldpath = newname + "/" + files.file.path;
			var newpath = new mongoID() + extname;
			
			upload(newpath, oldpath, (respErr,respBody, respInfo) => {
				if (respErr) {
					res.json({ "status": "error", "code": "保存失败" });
        }
        if (respInfo.statusCode == 200) {
          fs.unlink(oldpath, (err) => {
						if(err) {
							console.log(err);
						}
          });
					res.json({ "status": "ok", "url": `http://pa919xbba.bkt.clouddn.com/${respBody.key}` });
        } else {
          res.json({ "status": "error", "code": "保存失败" });
        }
			});





      // // //改名
      // fs.rename(oldpath, newpath, function(err) {
      //   if (err) {
      //     res.json({ "status": "error", "code": "保存失败" });
      //   } else {
      //     res.json({ "status": "ok", "url": newpath });
      //   }
      // });
    }
  });
});

module.exports = router;
