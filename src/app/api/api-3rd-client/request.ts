import axios3rdClient from "./client";

const token = localStorage.getItem('3rd-auth')
class Request {
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
const request3rdApi = new Request();
export default request3rdApi