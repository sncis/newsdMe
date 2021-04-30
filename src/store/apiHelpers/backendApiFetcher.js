import Cookies from "universal-cookie";
import backendAxiosInstance from "./backendAxiosInstance";


const backendApiFetcher = onAuthFailure => async(options) => {

  try{
    const response =  await backendAxiosInstance.request({
      url: options.url,
      method: options.method,
      data: options.data
    })
    console.log("%%%%%%%%%%%%%%")
    //
    // console.log(response)
    // const csrfToken = Cookies.get('XSRF_TOKEN')
    // // const cookie = new Cookies().set('XSRF_TOKEN',csrfToken, {httpOnly:true, sameSite:true})
    //
    // console.log("%%%%%%%%%%%%%%")
    // console.log(csrfToken)
    // backendAxiosInstance.setHeader('X-XSRF-TOKEN', cookie)
    return response

  } catch (error){
    if(error.response.status === 401){
      onAuthFailure()
      console.log(error.response.reason)
      throw new Error(error.response.message)
    }else if(error.response.status === 403){
      throw new Error(error.response.message)
    }else if(error.response.status === 500){
      throw new Error("Ups something went wrong with the server. We are sorry for that!")
    }else{
      throw new Error("unexpected Error")
    }
  }

}


export default backendApiFetcher