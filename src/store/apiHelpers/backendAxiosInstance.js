import axios from 'axios';


const backendAxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
})

backendAxiosInstance.setHeader = (header, value) => {
  backendAxiosInstance.defaults.headers[header] = value
}


backendAxiosInstance.interceptors.response.use(
    (response ) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),(error) => {

      if(!error.response){
      return new Promise((resolve,reject) => {
        reject(error);
      });
      }
      if(error.response.status === 403){
        window.location = "auth/1"
      }else{
        return new Promise((resolve,reject) => {
          reject(error)
        })
      }
    })



export default backendAxiosInstance;