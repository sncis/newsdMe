import axios from 'axios'
import {consoleSpyForProptypeError} from "../../setupTests";
import Cookies from "universal-cookie";


// onAuthFalure is a function which we take as an argument to backendApiFetcher(onAuthFailure) and return our
const backendApiFetcher = onAuthFailure => (options) => {
  console.log(options)

  const backendInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Frame-Options': 'deny',
      "X-Content-Type-Options": "nosniff",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "Content-Security-Policy": "default-src 'self' https://newsdbackend.herokuapp.com ; " +
          "script-src 'self' ; " +
          "img-src 'self' https://newscatcher.p.rapidapi.com; " +
          "manifest-src 'self'; " +
          "style-src 'self' ",
      "Permission-Policy": "camera 'none'; autoplay 'none'; battery 'none'; display-capture 'self'; document-domain 'none; execution-while-not-rendered 'self';" +
          "execution-while-out-of-viewport 'self'; fullscreen 'self'; geolocation 'self'; gyroscope 'self';" +
          "layout-animations 'none'; legacy-image-formats 'none'; magnetometer 'self'; microphone 'none';" +
          "midi 'none'; navigation-override 'none'; oversized-images 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-get 'none';" +
          "sync-xhr 'self'; usb 'none'; vr 'none'; wake-lock 'none'; screen-wake-lock 'none'; web-share 'self'; " +
          "xr-spatial-tracking 'none'",
      "Referrer-Policy": "strict-origin-when-cross-origin",


    },
    method: options.method,
    withCredentials: true,
  })

  return (
      backendInstance.request({url: `${options.url}`,data: options.data})
          .then(response => {
            if(response.status ===200 || response.status ===201){
              const cookies = new Cookies(response.headers.cookie);
              const csrfToken = cookies.get('XSRF-TOKEN');
              backendInstance.defaults.headers['XSRF-TOKEN'] = csrfToken
            }
            return response

          }).catch(error => {
            if(error.response.status === 401 ||error.response.status === 403 ){
              console.log(error.response.data.message)
              onAuthFailure();
              throw Error("Wrong username or password")
            }
            if(error.response.status === 400){
              console.log(error.response.data.message)

              onAuthFailure();
              throw Error(error.response.data.message)

            }
            if(error.response.status === 500) {
              console.log(error.response.data.message)
              throw Error("Ups something went wrong please try again later")
            }else{
              throw Error(error.response.data.message)
            }

      })
  )

}


export default backendApiFetcher