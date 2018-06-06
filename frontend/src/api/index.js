import axios from 'axios';

let api = {

};

api.register = (data, cd, ecd) => {
  axios.post('/api/register_blog', data)
  .then(cb)
  .catch(ecb);
}

export default api;
