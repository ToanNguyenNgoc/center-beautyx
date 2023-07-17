import { AUTH_LOCAL_TOKEN } from 'app/modules/auth';
import axios from 'axios'
import { baseURL } from 'configs/axios.config';
import queryString from 'query-string'

export const axiosV3Client = axios.create({
  baseURL: baseURL?.replace('v1', 'v3'),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})
axiosV3Client.interceptors.request.use(async (config) => {
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
