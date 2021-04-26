import axios from 'axios'
import Cookies from "universal-cookie";


const backendApiFetcher = onAuthFailure => (options) => {

  const backendInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: options.method,
    withCredentials: true,
  })

  return (
      backendInstance.request({url: `${options.url}`,data: options.data})
          .then(response => {
            if(response.status === 200 || response.status ===201){
              const cookies = new Cookies(response.headers.cookie);
              const csrfToken = cookies.get('XSRF-TOKEN');
              backendInstance.defaults.headers['XSRF-TOKEN'] = csrfToken
            }
            return response

          }).catch(error => {
            if(error.response.status === 401 ||error.response.status === 403 ){
              console.log(error.response)
              console.log(error.response.statusText)

              onAuthFailure();
              throw Error(error.response.statusText)
            }
            if(error.response.status === 400){
              console.log(error.response.data)

              // onAuthFailure();
              throw Error(error.response.statusText)

            }
            if(error.response.status === 500) {
              console.log(error.response.statusText)
              throw Error("Ups something went wrong please try again later")
            }else{
              throw Error(error.response.statusText)
            }

      })
  )

}


export default backendApiFetcher