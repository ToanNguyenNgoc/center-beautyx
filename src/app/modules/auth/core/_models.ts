import { IAUTHOR } from "app/interface"

export interface AuthModel {
  avatar?: string
  ci_api_token?: string
  ci_user?: string
  email?: string
  fullname?: string
  media?: string
  platform?: string
  roles: string
  telephone?: string
  token?: string
  token_expired_at?: string
}
// avatar: "https://api.myspa.vn/media/426/image?v=1656923425"
// ​​
// ci_api_token: null
// ​​
// ci_user: null
// ​​
// email: "nguyenthihoai@gmail.com"
// ​​
// fullname: "Yo"
// ​​
// id: 3284
// ​​
// media: Array [ {…} ]
// ​​
// platform: "BEAUTYX"
// ​​
// roles: "W10="
// ​​
// telephone: "0583580069"
// ​​
// token: "35459|6SIA5SIt7oZKSoJbnpxE"
// ​​
// token_expired_at: "2022-08-12 14:21:57"
export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

// export interface UserModel {
//   id: number
//   username: string
//   password: string | undefined
//   email: string
//   first_name: string
//   last_name: string
//   fullname?: string
//   occupation?: string
//   companyName?: string
//   phone?: string
//   roles?: Array<number>
//   pic?: string
//   language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
//   timeZone?: string
//   website?: 'https://keenthemes.com'
//   emailSettings?: UserEmailSettingsModel
//   auth?: AuthModel
//   communication?: UserCommunicationModel
//   address?: UserAddressModel
//   socialNetworks?: UserSocialNetworksModel
// }
export interface UserModel {
  avatar: string,
  media: [],
  email: string
  fullname: string
  id: number
  telephone: string
  token: string
  token_expired_at: string,
  roles: string
}
export interface USERROLE {
  avatar: string,
  media: [],
  email: string
  fullname: string
  id: number
  telephone: string
  token: string
  token_expired_at: string,
  roles: string,
  ROLE: IAUTHOR
}