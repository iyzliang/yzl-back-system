import axios from 'axios';

let api = {

};
var qs = require('qs');

api.register = (data, cd, ecd) => {
  axios.post('/api/register_blog', qs.stringify(data))
  .then(cd)
  .catch(ecd);
}

export default api;
