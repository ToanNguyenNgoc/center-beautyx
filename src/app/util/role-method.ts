export function checkMethod(methodPermissions: string) {
    let method = ""
    switch (methodPermissions) {
        case "index": return method = "GET_BY_ID"
        case "show": return method = "GET"
        case "ciUpdate": return method = "UPDATE"
        case "storeOrg": return method = "GET_BY_ORG_ID"
        case "update": return method = "UPDATE"
        case "destroy": return method = "DELETE"
        case "post": return method = "POST"
        default:
            break
    }
    return method
}