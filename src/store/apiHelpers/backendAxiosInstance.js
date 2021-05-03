import axios from 'axios';


const backendAxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
});

const getCookies = ()=>
    document.cookie.split(';').reduce((cookies, item) =>{
      const [name,value] = item.split('=');
      cookies[name] = value;
      return cookies;
    },{});

backendAxiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCookies()['XSRF-TOKEN']
  if(csrfToken) config.headers['X-XSRF-TOKEN'] = csrfToken;
  return config;
})


export default backendAxiosInstance;