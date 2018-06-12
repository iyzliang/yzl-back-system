import axios from 'axios';
import Vue from 'vue'

let api = {

};

api.register = (data, cd, ecd) => {
  axios.post('/api/register_blog', data)
  .then(cd)
  .catch(ecd);
}

api.login = (data, cd, ecd) => {
  axios.post('/api/login_blog', data)
  .then(cd)
  .catch(ecd);
}

api.addArticle = (data, cd ,ecd) => {
 if (localStorage.getItem('blog_token')) {
   axios.post('/api/article_blog', data, {
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('blog_token')}
    })
   .then(cd)
   .catch((err) => {
    window.location.hash = '#/login'; 
   });
 } else {
   window.location.hash = '#/login';
 }
}

api.getArticle = (data, cd ,ecd) => {
  if (localStorage.getItem('blog_token')) {
    axios.get('/api/article_blog', {
       headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('blog_token')}
     })
    .then(cd)
    .catch((err) => {
      window.location.hash = '#/login'; 
     });
  } else {
    window.location.hash = '#/login';
  }
}
export default api;
