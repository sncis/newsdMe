import Cookies from "universal-cookie";
import backendAxiosInstance from "./backendAxiosInstance";


const backendApiFetcher = onAuthFailure => async(options) => {

  try{
    const response =  await backendAxiosInstance.request({
      url: options.url,
      method: options.method,
      data: options.data
    })
    // console.log("%%%%%%%%%%%%%%")
    // //
    // console.log(response)
    // const csrfcookie = new Cookies()
    // const csrfToken = csrfcookie.get('XSRF_TOKEN')
    // const cookie = new Cookies().set('XSRF_TOKEN',csrfToken, {httpOnly:true, sameSite:true})
    // //
    // console.log("csrf token")
    // console.log(csrfToken)
    // backendAxiosInstance.setHeader('X-XSRF-TOKEN', cookie)
    return response

  } catch (error){
    // console.log("errrorororoor from response in backendfretcher")
    // console.log(error)
    // console.log(error.response)
    // throw new Error(error.response.data)

    if(error.response.status === 401){
      onAuthFailure()
      console.log(error.response.reason)
      throw new Error(error.response.data)
    }else if(error.response.status === 403){
      throw new Error("Sorry you are not allowed to access this resource")
    }else if(error.response.data){
      throw new Error(error.response.data)
    }else{
      throw new Error("Unexpected Error")
    }
  }

}


export default backendApiFetcher