import axios from 'axios'


const newsApiFetcher = (options) => {
  console.log(options)

  const newsInstance = axios.create({
    baseURL: "https://newscatcher.p.rapidapi.com/v1",
    method: 'get',
    headers:{
     "x-rapidapi-key" : "f973fc276cmsha0a573cbf1f0d4cp1f8c8ejsn1a933594d20c",
      "x-rapidapi-host": "newscatcher.p.rapidapi.com",
      "useQueryString":true,
      "Accept": 'application/json',
      'Content-Type': 'application/json,text/html,text/json',
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