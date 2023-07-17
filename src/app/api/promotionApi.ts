import { QrPromotion, ReqPromotionBody, ResponseDetail, ResponseList } from "@types"
import { Promotion } from "app/interface"
import { axiosClient } from "configs"

export const promotionApi = {
  getAll: (req: QrPromotion) => {
    return axiosClient.get('/promotions', {
      params: {
        ...req,
        'filter[all]': true,
        'sort': '-created_at'
      }
    })
      .then<ResponseList<Promotion[]>>(res => res.data.context)
  },
  getDetail: (id: number | string) => {
    return axiosClient.get(`/promotions/${id}`).then<ResponseDetail<Promotion>>(res => res.data)
  },
  pot: (body: ReqPromotionBody) => axiosClient.post(`/promotions`, body).then(res => res.data),
  put: (id: number | string, body: ReqPromotionBody) => axiosClient.put(`/promotions/${id}`, body).then(res => res.data),
  delete: (id: string | number) => axiosClient.delete(`/promotions/${id}`)
}