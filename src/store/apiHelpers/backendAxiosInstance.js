import axios from 'axios';


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

  //
  config.xsrfHeaderName= 'X-CSRF-TOKEN';
  config.xsrfCookieName= 'CSRF-TOKEN';
  document.cookie = 'CSRF-TOKEN=' + selfToken;
  config.headers['X-CSRF-TOKEN']= selfToken;

  console.log("csrf token from request ")

  console.log(getCookies()['CSRF-TOKEN'])
  console.log(config.xsrfCookieName)
  console.log("in request interceptor")
  console.log(config.headers.xsrfHeaderName)
  console.log(config.headers)

  // const csrfToken = getCookies()['XSRF-TOKEN']
  // const newCsrfToken = getCookies()["X-CSRF-TOKEN"]
  // console.log("getting all cookies")
  // console.log(getCookies())
  // console.log("csrf token ")
  // console.log(csrfToken)
  //
  // console.log("new cookie header")
  // console.log(newCsrfToken)
  // console.log("*********")
  // console.log("*******")
  // console.log("*******")
  //
  // if(csrfToken) config.headers['X-XSRF-TOKEN'] = csrfToken;
  //
  //
  // console.log("headers from request")
  // console.log(config.headers)
  // console.log("configs")
  // console.log(config)
  // console.log("xsrf cheader in request ")
  //
  // console.log(config.headers['X-XSRF-TOKEN']);
  // console.log(config.headers['X-CSRF-TOKEN']);
  config.withCredentials = true;

  return config;
})

backendAxiosInstance.interceptors.response.use((response) => {
  console.log("response headers**************")
  const cookies = getCookies()['CSRF-TOKEN']
  console.log("csrf cookie")
  console.log(cookies)
  console.log("all cookies")
  console.log(getCookies())
  console.log("headers name ")
  console.log(response.headers.xsrfHeaderName);
  return response;
})



export default backendAxiosInstance;