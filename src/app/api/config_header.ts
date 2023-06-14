
import { AUTH_LOCAL_TOKEN } from '../modules/auth/core/AuthHelpers';
export const AUTH_HEADER = (contentType?: 'application/json' | 'multipart/form-data') => {
    const session = window.sessionStorage.getItem(AUTH_LOCAL_TOKEN);
    const local = localStorage.getItem(AUTH_LOCAL_TOKEN)
    return {
        headers: {
            'Authorization': `Bearer ${session ? session : local}`,
            'Content-Type':contentType ?? 'application/json'
        },
    }
}
export const AUTH_HEADER_PARAM_GET = (params: any) => {
    const session = window.sessionStorage.getItem(AUTH_LOCAL_TOKEN);
    const local = localStorage.getItem(AUTH_LOCAL_TOKEN)
    return {
        params,
        headers: {
            'Authorization': `Bearer ${session ? session : local}`,
        },
    }
}
export const AUTH_HEADER_PARAM_DELE = (values: any) => {
    const session = window.sessionStorage.getItem(AUTH_LOCAL_TOKEN);
    const local = localStorage.getItem(AUTH_LOCAL_TOKEN)
    return {
        headers: {
            'Authorization': `Bearer ${session ? session : local}`,
        },
        data: values,
    }
}
export const AUTH_HEADER_PARAM_PUT = (values: any) => {
    const session = window.sessionStorage.getItem(AUTH_LOCAL_TOKEN);
    const local = localStorage.getItem(AUTH_LOCAL_TOKEN)
    return {
        headers: {
            'Authorization': `Bearer ${session ? session : local}`,
        },
        data: values,
    }
}
export const AUTH_LOCATION = () => {
    const location_user = JSON.parse(`${sessionStorage.getItem('USER_LOCATION')}`)
    let LOCATION;
    LOCATION = `${location_user?.lat},${location_user?.long}`;
    if (location_user) return LOCATION
}