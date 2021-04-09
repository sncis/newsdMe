//using axios default setup for refactoring 
import axios from 'axios'


export const backendInstance = axios.create({
  baseURL:'http://localhost:8082/',
  headers:  {'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': 'http://localhost:3000, http://127.0.0.1:3000',
  'Accept': 'application/json',
  'X-Frame-Options': 'DENY'},
  withCredentials: true,
});

