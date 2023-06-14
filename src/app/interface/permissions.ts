export interface IPermission {
    id: number,
    name: string,
    guard_name: string,
    summary: any,
    created_at: string,
    updated_at: string,
    pivot: {
        role_id: number,
        permission_id: number
    }
}