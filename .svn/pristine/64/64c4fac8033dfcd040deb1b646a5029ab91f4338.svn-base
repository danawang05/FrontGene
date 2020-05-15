import axios from 'axios';
// import createHistory from 'history/createHashHistory';
const createHistory = require("history").createHashHistory
const history = createHistory()

//如果有token就在请求头里面带上
axios.interceptors.request.use(function (config) {
  // config.headers['Content-Type'] = "application/json"
  // config.headers['Access-Control-Allow-Headers'] = "*"
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

//对登陆过期做处理
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // const { errCode } = error.response.data;
  // if (errCode && errCode === 100) {
  //   localStorage.removeItem('login_token');
  //   history.push('/login');
  // }
  return Promise.reject(error);
});