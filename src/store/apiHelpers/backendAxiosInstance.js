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

export default backendAxiosInstance;