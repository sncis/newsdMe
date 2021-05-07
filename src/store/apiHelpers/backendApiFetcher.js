import backendAxiosInstance from "./backendAxiosInstance";
import { logoutAction } from "../actions/userActions/loginActions"


const backendApiFetcher = onAuthFailure => async(options) => {
// const backendApiFetcher = async (options) => {
  try{
    return await backendAxiosInstance.request({
      url: options.url,
      method: options.method,
      data: options.data
    });

    // return response

  } catch (error){
    if(!error.response){
      // console.log(error)
      throw new Error("Sorry some Error occurred")
    }else{
      if(error.response.status === 401){
        onAuthFailure()
        // logoutAction()
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