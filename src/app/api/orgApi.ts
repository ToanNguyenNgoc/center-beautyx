import axiosClient from "./axios";
import { pickBy, identity } from 'lodash';
import { AUTH_LOCATION } from "./config_header";
import { AUTH_HEADER_PARAM_GET } from './config_header'


class Organization {
    getOrgById = (id: any) => {
        const LOCATION = AUTH_LOCATION();
        const paramsOb = {
            "filter[location]": LOCATION,
        }
        const params = pickBy(paramsOb, identity);
        const url = `/organizations/${id}`;
        return axiosClient.get(url, AUTH_HEADER_PARAM_GET(pickBy(params)));
    };
    //example get all-----------------
    getAll = (values?: any) => {
        const LOCATION = AUTH_LOCATION();
        const url = `/organizations`;
        const paramsOb = {
            page: values.page || 1,
            limit: 15,
            "filter[keyword]": values.keyword,
            "filter[tags]": values.tags,
            "filter[min_price]": values.min_price,
            "filter[max_price]": values.max_price,
            "filter[is_momo_ecommerce_enable]": values.is_ecommerce,
            "filter[location]": values.sort === "distance" ? LOCATION : null,
            "filter[province_code]": values.province_code,
            "filter[district_code]": values.district_code,
            "sort": values.sort !== "distance" ? values.sort : null,
            "include": "tags|province|district|ward|branches|favorites"
        }
        const params = pickBy(paramsOb, identity);
        return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params))
    };
    //get services, products by org
    getServicesByOrg = (values: any) => {
        const url = `/organizations/${values.org_id}/services`;
        const paramsOb = {
            page: values.page || 1,
            limit: 15,
            "filter[keyword]": values.keyword,
            "filter[service_group_id]": values.cate_id,
            "filter[special]": values.special,
            "filter[is_momo_ecommerce_enable]": values.is_ecommerce,
            "include": "category|favorites_count",
            "append": "is_favorite|rating|bought_count",
        };
        const params = pickBy(paramsOb, identity);
        if (values.org_id) {
            return axiosClient.get(url, { params })
        }
    }
}
export const orgApi = new Organization();
export default orgApi;
