import { AUTH_HEADER } from "app/api/config_header";
import { identity, pickBy } from "lodash";
import useSWR from "swr";

export function useFetch(condition: boolean, API_URL: string, query?: any) {

    let paramsURL = ''
    if (query) {
        paramsURL = `?${new URLSearchParams(pickBy(query, identity)).toString()}`
    }


    const { data, error, isValidating } = useSWR(API_URL,
        (apiURL: string) => condition && fetch(`${apiURL}${paramsURL}`, AUTH_HEADER()).then(res => res.json()), {
        revalidateOnFocus: false,
    })
    let response
    let totalPage:number = 1
    let totalItem:number =1
    if (data) {
        response = data.data?.context ?? data
        totalPage = data.data?.context?.total_page
        totalItem = data.data?.context?.total
    }
    return {
        response, error, isValidating, totalPage, totalItem
    }
}