export type User = {
  _id: string,
  fullname: string,
  email: string,
  telephone: string,
  admin: boolean,
  createdAt: string,
  updatedAt: string,
  __v: number,
  token: string
}

export type ResMedia = {
  name: string,
  mime_type: string,
  size: number,
  original_url: string,
  _id: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}