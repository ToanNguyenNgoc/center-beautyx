import axios from 'axios'
import { KEY } from 'common';
import queryString from 'query-string'

// export const baseURL = process.env.REACT_APP_API_URL_DEV;
export const baseURL = process.env.REACT_APP_API_URL ?? process.env.REACT_APP_API_LIVE
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})
axiosClient.interceptors.request.use(async (config:any) => {
  config.headers.Authorization = `Bearer ${KEY.TK}`
  return config
})
axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    throw error
  }
)

export default axiosClient
