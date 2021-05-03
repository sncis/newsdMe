import axios from 'axios';
import Cookies from 'universal-cookie';


const backendAxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,

});

backendAxiosInstance.xsrfHeaderName= 'X-CSRF-TOKEN';
backendAxiosInstance.xsrfCookieName= 'CSRF-TOKEN';

export const getCookies = ()=>
    document.cookie.split(';').reduce((cookies, item) =>{
      const [name,value] = item.split('=');
      cookies[name] = value;
      return cookies;
    },{});

backendAxiosInstance.interceptors.request.use((config) => {
  const selfToken = Math.random().toString(36).substring(10)

  const coo = new Cookies()
  coo.set("CSRF-TOKEN",selfToken);
  config.xsrfHeaderName= 'X-CSRF-TOKEN';
  config.xsrfCookieName= 'CSRF-TOKEN';
  document.cookie = 'CSRF-TOKEN=' + selfToken;
  config.headers['X-CSRF-TOKEN']= selfToken;

  console.log("csrf token from request ")

  console.log(getCookies()['CSRF-TOKEN'])
  console.log(config.xsrfCookieName)
  console.log("in request interceptor")
  console.log(config.xsrfHeaderName)
  console.log(config.headers)

  config.withCredentials = true;

  return config;
})

backendAxiosInstance.interceptors.response.use((response) => {
  console.log("response headers**************")
  const cookies = getCookies()['CSRF-TOKEN']
  console.log("csrf cookie from response")
  console.log(cookies)

  console.log("headers name from response")
  console.log("headers name from response")
  console.log(response.headers);

  return response;
})



export default backendAxiosInstance;