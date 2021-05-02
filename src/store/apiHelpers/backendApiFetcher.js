import Cookies from "universal-cookie";
import backendAxiosInstance from "./backendAxiosInstance";


const backendApiFetcher = onAuthFailure => async(options) => {

  try{
    const response =  await backendAxiosInstance.request({
      url: options.url,
      method: options.method,
      data: options.data
    });

    return response

  } catch (error){
    if(!error.response){
      throw new Error("Sorry some Error occurred")
    }else{
      if(error.response.status === 401){
        onAuthFailure()
        throw new Error(error.response.data)
      }else if(error.response.status === 403){
        throw new Error("Sorry you are not allowed to access this resource")
      }else if(error.response.data){
        throw new Error(error.response.data)
      }else{
        throw new Error("Unexpected Error occurred")
      }
    }
  }

};


export default backendApiFetcher