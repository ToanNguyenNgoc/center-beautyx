import axios from "axios";
import axios3rdClient, { mediaBaseURL } from "./client";

const token = localStorage.getItem('3rd-auth')
class Request {
    mediaCloud = (formData: FormData) => axios.post(`${mediaBaseURL}/media/cloud`, formData)
    media = (formData: FormData) => axios.post(`${mediaBaseURL}/media`, formData)
    postTrend = (values: any) => {
        return axios3rdClient.post('/trends', values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    }
    refreshComment = (id: string) => {
        return axios3rdClient.get(`/tiktok/refresh_comment/${id}`)
    }
}
export const request3rdApi = new Request();
export default request3rdApi