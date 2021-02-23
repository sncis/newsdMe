//using axios default setup for refactoring 
import axios from 'axios'


const backendInstance = axios.create({
  baseURL:'http://localhost:8080/',
});

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

backendInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
console.log('44444444444')

backendInstance.defaults.headers.post['Content-Type'] = 'application/json'
backendInstance.defaults.headers.get['Content-Type'] = 'application/json'
backendInstance.defaults.headers.delete['Content-Type'] = 'application/json'

backendInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
backendInstance.defaults.headers.common['Accept'] = 'application/json'

console.log(backendInstance.defaults.headers)

export default backendInstance;

