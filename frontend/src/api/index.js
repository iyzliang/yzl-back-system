import axios from 'axios';
import Vue from 'vue'

let api = {

};
var qs = require('qs');

api.register = (data, cd, ecd) => {
  axios.post('/api/register_blog', qs.stringify(data))
  .then(cd)
  .catch(ecd);
}

api.login = (data, cd, ecd) => {
  axios.post('/api/login_blog', qs.stringify(data))
  .then(cd)
  .catch(ecd);
}

api.addArticle = (data, cd ,ecd) => {
 if (localStorage.getItem('blog_token')) {
   axios({
      url: '/api/article_blog',
      method: 'post',
      data: qs.stringify(data),
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('blog_token')}
    })
   .then(cd)
   .catch(ecd);
 } else {
   window.location.hash = '#/login';
 }
}
export default api;
