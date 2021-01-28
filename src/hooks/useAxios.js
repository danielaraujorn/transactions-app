import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

export const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: process.env.REACT_APP_API_URL }),
})
