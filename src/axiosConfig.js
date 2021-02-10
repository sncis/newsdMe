//using axios default setup for refactoring 
import axios from 'axios'


const backendInstance = axios.create({
  baseURL:'http://localhost:8080/'
});

backendInstance.defaults.headers.common['Authorization'] = `Barear ${localStorage.getItem('token')}`

export default backendInstance;