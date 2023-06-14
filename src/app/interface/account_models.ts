export interface AuthModel {
  avatar: string
  ci_api_token: string
  ci_user: string
  email: string
  fullname: string
  media: string
  platform: string
  roles: string
  telephone: string
  token: string
  token_expired_at: string
}
export interface UserModel {
  avatar: string
  media: []
  email: string
  fullname: string
  id: number
  telephone: string
  token: string
  token_expired_at: string
}
export interface User{
  avatar:string,
  birthday?:string,
  email:string,
  fullname:string,
  gender:string,
  id:number,
  platform?:string,
  telephone:string
}