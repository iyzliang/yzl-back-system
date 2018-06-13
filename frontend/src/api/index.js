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

api.getArticle = (data, cd, ecd) => {
  if (localStorage.getItem('blog_token')) {
    axios.get('/api/article_blog', {
      params: {id: data.id},
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

api.delete = (data, cd, ecd) => {
  if (localStorage.getItem('blog_token')) {
    axios.delete('/api/article_blog', {
      data: data,
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

api.getArticleList = (data, cd ,ecd) => {
  if (localStorage.getItem('blog_token')) {
    axios.get('/api/article_list_blog', {
      params: data,
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

api.addTag = (data, cd, ecd) => {
  if (localStorage.getItem('blog_token')) {
    axios.post('/api/tag_blog', data, {
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

api.getTags = (data, cd, ecd) => {
  if (localStorage.getItem('blog_token')) {
    axios.get('/api/tag_blog', {
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

api.deleteTag = (data, cd, ecd) => {
  if (localStorage.getItem('blog_token')) {
    axios.delete('/api/tag_blog', {
      data: data,
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

api.uploadimg = (data, cd, ecd) => {
  if (localStorage.getItem('blog_token')) {
    axios({
      url: '/api/upload',
      method: 'post',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data', "Authorization": "Bearer " + localStorage.getItem('blog_token')},
    })
    .then(cd)
  }else{
    window.location.hash = '#/login';
  }
}
export default api;
