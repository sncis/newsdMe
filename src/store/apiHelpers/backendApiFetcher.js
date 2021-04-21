import axios from 'axios'
import {consoleSpyForProptypeError} from "../../setupTests";
import Cookies from "universal-cookie";


// onAuthFalure is a function which we take as an argument to backendApiFetcher(onAuthFailure) and return our
const backendApiFetcher = onAuthFailure => (options) => {
  console.log(options)

  // let setHeader = (header,token)=>{
  //   backendInstance.headers[header] = token
  // }

  const backendInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
    // baseURL: 'http://localhost:8082/',
    // baseUrl: 'https://newsdbackend.herokuapp.com/',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Frame-Options': 'DENY'
    },
    method: options.method,
    withCredentials: true,
  })

  return (
      backendInstance.request({url: `${options.url}`,data: options.data})
          .then(response => {
            console.log("respones from baceknd")
            console.log(response)
            const cookies = new Cookies(response.headers.cookie)
            const csrfToken = cookies.get('XSRF-TOKEN');
            backendInstance.defaults.headers['XSRF-TOKEN'] = csrfToken
            if(response.statusCode === 401){
              console.log(response.statusText)
              throw Error('rejected')
            }else{
              return response
            }

          }).catch(error => {
            if(error.message === "rejected"){

              onAuthFailure(); // method which is passed is called
              return
            }
            console.log(error)
            throw Error("something went wrong")
      })
  )

}


export default backendApiFetcher