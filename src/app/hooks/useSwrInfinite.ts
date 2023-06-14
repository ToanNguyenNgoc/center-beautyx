import { useSWRInfinite } from "swr";
import { pickBy, identity } from "lodash"

export function useSwrInfinite(
    condition: any,
    API_URL: string,
    params?: any,
    focus?:boolean
) {
    let paramsURL = "";
    if (params) {
        paramsURL = `&${new URLSearchParams(pickBy(params, identity)).toString()}`
    }
    const { data, isValidating, size, setSize, mutate } = useSWRInfinite(
        (index) => condition && `${API_URL}?page=${index + 1}${paramsURL}`,
        {
            revalidateOnFocus: focus && true,
            initialSize: 1
        }
    );
    let resData: any[] = [];
    let totalItem = 1;
    let totalPage = 1
    if (data) {
        totalItem = data[0]?.data?.context?.total ?? data[0]?.data?.total;
        resData = Array.isArray(data) ? data?.map((i: any) => (i?.data?.context?.data ?? i?.data?.data?.hits)).flat() : [];
        totalPage = data[0]?.data?.context?.last_page ?? data[0]?.data?.last_page
    }
    const onLoadMore = () => {
        setSize(size + 1)
    }
    return {
        resData,
        totalItem,
        totalPage,
        isValidating,
        onLoadMore,
        mutate
    }
}
export default useSwrInfinite