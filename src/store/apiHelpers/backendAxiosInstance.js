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

export default backendAxiosInstance;