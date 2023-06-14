import axiosClient from "./axios"
import { IPUT_APPROVE } from './interface'
import { API_ROUTE } from "./api-route"
import { identity, pickBy } from 'lodash'
import {  AUTH_HEADER } from "./config_header"

class ApproveApi {
    putApprove = (id: number | string, body: IPUT_APPROVE) => {
        return axiosClient.put(
            API_ROUTE.APPROVES_BY_ID(id),
            pickBy(body, identity),
            AUTH_HEADER()
        )
    }
}
export const approveApi = new ApproveApi()