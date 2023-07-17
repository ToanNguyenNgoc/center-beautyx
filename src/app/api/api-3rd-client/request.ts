import axios3rdClient from "./client";
import { ResponseDetail } from "@types";
import { ITrend } from "app/pages/trends/trend.interface";

class Request {
    login = (body: { email: string, password: string }) => {
        return axios3rdClient.post('/auth/login', body)
    }
    mediaCloud = (formData: FormData) => axios3rdClient.post(`/media/cloudinary`, formData)
    media = (formData: FormData) => axios3rdClient.post(`/upload/media`, formData)
    trend = (id: number | string) => {
        return axios3rdClient.get(`/trends/${id}`, {
            params: {
                'include': 'services'
            }
        }).then<ResponseDetail<ITrend>>(res => res.data.data)
    }
    postTrend = (values: any) => axios3rdClient.post('/trends', values)
    putTrend = (id: string, values: any) => axios3rdClient.put(`/trends/${id}`, values)
    refreshComment = (id: string) => axios3rdClient.get(`/tiktok/refresh_comment/${id}`)
}
export const request3rdApi = new Request();
export default request3rdApi