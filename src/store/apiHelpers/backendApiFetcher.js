import axios from 'axios'
import Cookies from "universal-cookie";
import backendAxiosInstance from "./backendAxiosInstance";


const backendApiFetcher = onAuthFailure => async(options) => {

  try{
    return await backendAxiosInstance.request({
      url: options.url,
      method: options.method,
      data:options.data
    })

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