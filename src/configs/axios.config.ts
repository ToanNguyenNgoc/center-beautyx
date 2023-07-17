import { AUTH_LOCAL_TOKEN } from 'app/modules/auth';
import axios from 'axios'
import queryString from 'query-string'

// export const baseURL = process.env.REACT_APP_API_URL_DEV;
export const baseURL = process.env.REACT_APP_API_URL ?? process.env.REACT_APP_API_LIVE
export const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})
axiosClient.interceptors.request.use(async (config) => {
  const session = window.sessionStorage.getItem(AUTH_LOCAL_TOKEN);
  const local = localStorage.getItem(AUTH_LOCAL_TOKEN)
  config = {
    ...config,
    headers: {
      'Authorization': `Bearer ${session ?? local}`
    }
  }
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
