import { IPermission } from "app/interface"
import { useAuth } from "app/modules/auth"
import { checkMethod, unique } from "app/util"
import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export function useVerifyRoute() {
    const location = useLocation()
    const param = useParams()
    const navigate = useNavigate()
    //generate route by permission
    const permissions: IPermission[] = useAuth().permissionsUser
    const generateRoute = permissions?.map((i: IPermission, index: number) => {
        const route = i.name.split('.')[1]
        const method = checkMethod(i.name.split('.')[i.name.split('.').length - 1])
        let path = `/pages/${route}`
        return {
            ...i,
            route_id: index + 1,
            path: path,
            method: method
        }
    })
    const generateRoutePath = unique(generateRoute?.map(i => i.path))
    const ROUTES = generateRoutePath?.map((i => {
        const permissions = generateRoute?.filter(a => a.path === i)
        return {
            path: i,
            path_detail: `${permissions?.find(d => d.method === "GET_BY_ID")?.path}/${param.id}`,
            path_post: `${permissions?.find(d => d.method === "POST")?.path}-form`,
            path_update: `${permissions?.find(d => d.method === "POST")?.path}-form/${param.id}`,
            permissions: permissions,
            method: permissions.map(mt => mt.method)
        }
    }))
    let firstLoad = true
    if (ROUTES?.length > 0) firstLoad = false
    const METHOD = ROUTES?.find(i =>
    (
        i.path === location.pathname ||
        i.path_detail === location.pathname ||
        i.path_post === location.pathname ||
        i.path_update === location.pathname
    )
    )?.method
    useEffect(() => {
        if (!firstLoad && !METHOD) navigate("/error/404")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [METHOD, firstLoad])
    return { firstLoad, METHOD, ROUTES }
}