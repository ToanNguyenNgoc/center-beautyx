import axiosClient from "./axios";
import { pickBy, identity } from 'lodash'
import { API_ROUTE } from "./api-route";
import { ReqDiscount, ReqDiscountBody, ReqDiscountCode, ReqDiscountDetail, ResponseDetail, ResponseList } from "@types";
import { ICouponCodeCampaign, IDiscountPar } from "app/interface"
import { AUTH_HEADER } from "app/api/config_header";

class Discounts {
    postDiscount = (body: ReqDiscountBody) => {
        return axiosClient.post(API_ROUTE.DISCOUNTS, body, AUTH_HEADER())
    }
    getAll = (query: ReqDiscount) => {
        return axiosClient
            .get(API_ROUTE.DISCOUNTS, { params: pickBy(query, identity) })
            .then<ResponseList<IDiscountPar[]>>(res => res.data.context)
    }
    getDiscountDetail = (query: ReqDiscountDetail) => {
        return axiosClient
            .get(API_ROUTE.DISCOUNTS_ID(query.id), { params: pickBy(query, identity) })
            .then<ResponseDetail<IDiscountPar>>(res => res.data)
    }
    getCodeIsCampaign = (qr?: ReqDiscountCode) => {
        return axiosClient
            .get(API_ROUTE.CAMPAIGN_UUID, { params: qr })
            .then<ResponseList<ICouponCodeCampaign[]>>(res => res.data.context)
    }
}
export const discountsApi = new Discounts();
export default discountsApi