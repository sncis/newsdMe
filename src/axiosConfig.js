// using axios default setup for refactoring
import axios from 'axios'


export const backendInstance = axios.create({
  baseURL:'http://localhost:8082/',
  headers:  {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
  // 'Access-Control-Allow-Origin': 'http://localhost:3000, http://127.0.0.1:3000',
  'X-Frame-Options': 'DENY'},
  withCredentials: true,
});

