var qiniu = require('qiniu');

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z1;

var accessKey = 'axiqqE0fHAucoxsDobP3vUUtEwn15ooZwr2XXD1F';
var secretKey = 'hV9mxE7ASLkTSqcYgupEve00_rm5ymB-B0BUD2Iq';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: 'blogimg',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

/**
 * 
 * @param {文件名} key 
 * @param {文件本地路径} localFile 
 * @param {回调} cd 
 */
var upload = (key, localFile, cd) => {
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();
  formUploader.putFile(uploadToken, key, localFile, putExtra, cd);
}

module.exports = upload;