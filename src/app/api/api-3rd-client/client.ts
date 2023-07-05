import axios from 'axios'
import queryString from 'query-string'

export const baseURL = 'https://api.beautyx.life/v1'
// export const baseURL = 'http://localhost:3004/v1'
export const mediaBaseURL = 'https://media.beautyx.life'

const axios3rdClient = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
})
axios3rdClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('3rd-auth')
    config = { ...config, headers: { 'Authorization': `Bearer ${token}` } }
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

export default axios3rdClient
