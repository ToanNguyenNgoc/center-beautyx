import { QrCommunity, ReqPostBody, ResponseDetail, ResponseList } from "@types";
import { Post } from "app/interface";
import { axiosClient } from "configs";

export const communityApi = {
  getAll: (qr: QrCommunity) => axiosClient
    .get('/post', { params: qr })
    .then<ResponseList<Post[]>>(res => res.data.context),

  getDetail: (id: number | string) => axiosClient
    .get(`/post/${id}`, { params: { 'append': 'media_url' } })
    .then<ResponseDetail<Post>>(res => res.data),

  post: (body: ReqPostBody) => axiosClient
    .post('/posts', body)
    .then<ResponseDetail<Post>>(res => res.data),
}