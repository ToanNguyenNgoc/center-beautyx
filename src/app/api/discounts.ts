import { pickBy, identity } from 'lodash'
import { API_ROUTE } from "./api-route";
import { QrDiscount, QrDiscountCode, QrDiscountDetail, ReqDiscountBody, ResponseDetail, ResponseList } from "@types";
import { ICouponCodeCampaign, IDiscountPar } from "app/interface"
import { AUTH_HEADER } from "app/api/config_header";
import { axiosClient } from 'configs';

class Discounts {
    postDiscount = (body: ReqDiscountBody) => {
        return axiosClient.post(API_ROUTE.DISCOUNTS, body, AUTH_HEADER())
    }
    putDiscount = (id: number | string, body: ReqDiscountBody) => {
        return axiosClient.put(API_ROUTE.DISCOUNTS_ID(id), body, AUTH_HEADER())
    }
    getAll = (query: QrDiscount) => {
        return axiosClient
            .get(API_ROUTE.DISCOUNTS, { params: pickBy(query, identity) })
            .then<ResponseList<IDiscountPar[]>>(res => res.data.context)
    }
    getDiscountDetail = (query: QrDiscountDetail) => {
        return axiosClient
            .get(API_ROUTE.DISCOUNTS_ID(query.id), { params: pickBy(query, identity) })
            .then<ResponseDetail<IDiscountPar>>(res => res.data)
    }
    getCodeIsCampaign = (qr?: QrDiscountCode) => {
        return axiosClient
            .get(API_ROUTE.CAMPAIGN_UUID, { params: qr })
            .then<ResponseList<ICouponCodeCampaign[]>>(res => res.data.context)
    }
}
export const discountsApi = new Discounts();
export default discountsApi