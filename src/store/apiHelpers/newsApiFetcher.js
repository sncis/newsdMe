import axios from 'axios'


const newsApiFetcher = (options) => {
  console.log(options)
  console.log(process.env)
  console.log(process.env.REACT_APP_NEWSCRATCHER_BASE_URL)

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
            console.log(response)
            return response
          }).catch(error => {
            console.log(error)
            throw Error("something whent wrong from news api")
      })

  )
}

export default newsApiFetcher;