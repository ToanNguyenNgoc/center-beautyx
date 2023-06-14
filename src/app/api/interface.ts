export interface IFORGOT {
  telephone: string
  new_password: string
  code: string
  verification_id: string
}
export interface IREGISTER {
  fullname: string
  email: string
  telephone: string
  password: string
  platform: string
  code: string
  verification_id: string
}
export interface ILOGIN {
  email: string
  password: string
  platform: string
}
export interface IPUT_PROFILE {
  fullname?: string
  media?: number
}
export interface IPUT_APPROVE {
  status: "PENDING" | "REJECT" | "APPROVED" | "REVIEW",
  log?: string
}
