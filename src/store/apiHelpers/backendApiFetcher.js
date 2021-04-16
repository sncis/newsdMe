import axios from 'axios'


// onAuthFalure is a function which we take as an argument to backendApiFetcher(onAuthFailure) and return our
export default onAuthFailure => (options) => {
  console.log(options)

  const backendInstance = axios.create({
    baseURL: 'http://localhost:8082/',
    headers: {
      'Accept': 'application/json, text/plain',
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Frame-Options': 'DENY'
    },
    method: options.method,
    withCredentials: true,
  })

  return (
      backendInstance.request({url: `${options.url}`,data: options.data})
          .then(response => {
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