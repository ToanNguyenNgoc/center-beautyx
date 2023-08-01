export interface User {
  avatar: string,
  media: [],
  email: string
  fullname: string
  id: number
  telephone: string
  token: string
  token_expired_at: string,
  btx_points:number
}
export interface Customer extends User{
  platform:string;
  current_platform:string|null;
  created_at:string;
}