import axios from 'axios'


const newsApiFetcher = (options) => {
  const newsInstance = axios.create({
    baseURL: process.env.REACT_APP_NEWSCRATCHER_BASE_URL,
    method: 'get',
    headers:{
     "x-rapidapi-key" : process.env.REACT_APP_NEWSCRATCHER_API_KEY,
      "x-rapidapi-host": "newscatcher.p.rapidapi.com",
      "useQueryString":true,
      "Accept": 'application/json text/html',
      'Content-Type': 'application/json',

    }
  })

  return (
      newsInstance.request({url:`${options.url}`, params: options.params})
          .then(response => {
            return response
          }).catch(error => {
            throw Error("something went wrong while getting the information")
      })

  )
}

export default newsApiFetcher;