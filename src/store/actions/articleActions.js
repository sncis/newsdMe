import axios from "axios";
import { SET_USER_ARTICLES } from "../constants/constants";
import store from "../../store/stor"


const header ={
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}



export const setUserArticels = (articles) => ( {
  type: SET_USER_ARTICLES,
  payload: articles
})


const testToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb21lVXNlciIsImV4cCI6MTYwOTg3OTYzNiwiaWF0IjoxNjA5ODYxNjM2fQ.Rzb1xsKUlAWKXTVMnT-olQXU4iWPFk0gf_kq2wXr7XvX5uPtN0T5AEoR4Hp7pd8awoumNc9bSxnpfhCAzEfa7A"

export const getUserArticles = () => {
  return dispatch => {
    // const url = `http://localhost:8080/dashboard/user?${store.getState().userName}`
    const url = `http://localhost:8080/dashboard/articles?user=someUser`

   header.headers.Authorization = `Bearer ${store.getState().jwtToken}`
    //  header.headers.Authorization = `Bearer ${testToken}`

    // console.log(store.getState().jwtToken)
    axios
    .get(url,header)
    .then(response => {
      console.log(response.data)
      dispatch(setUserArticels(response.data));
    })
    .catch(error => {
      if(error.response){
        console.log(error.response.data.message)

      }
    })

  }
}
