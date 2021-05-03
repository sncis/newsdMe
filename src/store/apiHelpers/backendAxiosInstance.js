import axios from 'axios';


const backendAxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
});

export const getCookies = ()=>
    document.cookie.split(';').reduce((cookies, item) =>{
      const [name,value] = item.split('=');
      cookies[name] = value;
      return cookies;
    },{});

backendAxiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCookies()['XSRF-TOKEN']
  const newCsrfToken = getCookies()["X-CSRF-TOKEN"]
  console.log("getting all cookies")
  console.log(getCookies())
  console.log("csrf token ")
  console.log(csrfToken)

  console.log("new cookie header")
  console.log(newCsrfToken)
  console.log("*********")
  console.log("*******")
  console.log("*******")

  if(csrfToken) config.headers['X-XSRF-TOKEN'] = csrfToken;
  if(csrfToken) config.headers['X-CSRF-TOKEN'] = csrfToken;


  console.log("headers from request")
  console.log(config.headers)
  console.log("configs")
  console.log(config)
  console.log("xsrf cheader in request ")

  console.log(config.headers['X-XSRF-TOKEN']);
  console.log(config.headers['X-CSRF-TOKEN']);
  config.withCredentials = true,

  return config;
})

backendAxiosInstance.interceptors.response.use((response) => {
  const cookies = getCookies()['XSRF-TOKEN']
  console.log("xsrf cookie")
  console.log(cookies)
  console.log("all cookies")
  console.log(getCookies())
  console.log("headers")
  console.log(response.headers)
  return response;
})



export default backendAxiosInstance;