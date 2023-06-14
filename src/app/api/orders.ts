import axiosClient from "./axios";
import { pickBy, identity } from 'lodash';
import { AUTH_HEADER_PARAM_GET } from './config_header'
import {paramOrder} from 'app/query-params'

class Orders {
    getAllOrder = (values: any) => {
        const url = `/orders`;
        const paramsOb = {
            // page: values.page || 1,
            // limit: 15,
            // "filter[status]": values.status,
            // "filter[platform]": "BEAUTYX",
            // "includes": "items|organization|branch|user",
            // "sort": values.sort,
            // "user_id": values.user_id
            ...paramOrder,
            "append":""
        }
        const params = pickBy(paramsOb, identity);
        return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params))
    }
}
const orderApi = new Orders();
export default orderApi