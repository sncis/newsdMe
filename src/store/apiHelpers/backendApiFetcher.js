import axios from 'axios'
import {consoleSpyForProptypeError} from "../../setupTests";
import Cookies from "universal-cookie";


// onAuthFalure is a function which we take as an argument to backendApiFetcher(onAuthFailure) and return our
const backendApiFetcher = onAuthFailure => (options) => {
  console.log(options)

  let setHeader = (header,token)=>{
    backendInstance.headers[header] = token
  }

  let backendInstance = axios.create({
    // baseURL: 'http://localhost:8082/',
    baseUrl: 'https://newsdbackend.herokuapp.com/',
    headers: {
      'Accept': 'application/json, text/plain',
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Frame-Options': 'DENY'
    },
    method: options.method,
    withCredentials: true,
  })

  // set header(header,token){
  //   console.log(header)
  //   console.log(token)
  //
  //   console.log(backendInstance.headers)
  //
  // }

  return (
      backendInstance.request({url: `${options.url}`,data: options.data})
          .then(response => {
            const cookies = new Cookies(response.headers.cookie)
            const csrfToken = cookies.get('XSRF-TOKEN');
            backendInstance.headers['XSRF-TOKEN'] = csrfToken
            if(response.statusCode === 401){
              throw Error('rejected')
            }
            return response
          }).catch(error => {
            if(error.message === "rejected"){

              onAuthFailure(); // method which is passed is called
              return
            }
            throw Error("something went wrong")
      })
  )

}


export default backendApiFetcher