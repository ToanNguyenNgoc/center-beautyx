import axiosClient from "./axios"
import { AUTH_HEADER } from "./config_header"
import { API_ROUTE } from "./api-route";
import { pickBy, identity } from "lodash"
import { ResponseDetail, ResponseList } from "@types";
import { IBanner } from "app/interface";

class BannerApi {
  banners = () => {
    const params = {
      "page": 1,
      "limit": 15,
      "platform": "MOMO",
      "include": "origin",
      "sort": "-priority",
    };
    return axiosClient.get(API_ROUTE.BANNERS, { params }).then<ResponseList<IBanner[]>>(res => res.data.context);
  }
  deleteBanner = (id: number) => axiosClient.delete(API_ROUTE.BANNERS_ID(id))
  getAll = () => {
    const params = {
      "page": 1,
      "limit": 15,
      "platform": "MOMO",
      // "include": "origin",
      "sort": "-created_at",
    };
    return axiosClient.get(API_ROUTE.BANNERS, { params });
  };
  getDetailById = (id: number | string) => {
    return axiosClient.get(API_ROUTE.BANNERS_ID(id)).then<ResponseDetail<IBanner>>(res => res.data)
  }
  postBanner = (values: any) => {
    const params = pickBy(values, identity)
    return axiosClient.post(API_ROUTE.BANNERS, params, AUTH_HEADER())
  }
  putBanner = (id: number | string, values: any) => {
    return axiosClient.put(API_ROUTE.BANNERS_ID(id), pickBy(values, identity))
  }
}
export const bannerApi = new BannerApi();
export default bannerApi;