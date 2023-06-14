export * from './core/_models'
export * from './core/Auth'
export * from './core/AuthHelpers'
export * from './AuthPage'
export * from './Logout'
export interface IAUTH_ROLE {
    ADMIN: string,
    SUPPORT: string,
    MAR: string,
    USER: string
}
export const AUTH_ROLE: IAUTH_ROLE = {
    ADMIN: "ADMIN",
    SUPPORT: "SUPPORT",
    MAR: "MAR",
    USER: "USER"
}
export const ALL_ROLE = [AUTH_ROLE.ADMIN, AUTH_ROLE.SUPPORT, AUTH_ROLE.USER, AUTH_ROLE.MAR]