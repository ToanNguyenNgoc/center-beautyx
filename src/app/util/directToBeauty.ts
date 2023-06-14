import { IOrganization } from "../interface/organization";

export const DIRECT_ORG = (org: IOrganization) => {
    if (org) {
        const newWindow = window.open(`https://beautyx.vn/cua-hang/${org.subdomain}`, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
}
export function DIRECT_ORG_E(id: number | string) {
    // console.log(id)
    const newWindow = window.open(`https://beautyx.vn/cua-hang/${id}`, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}