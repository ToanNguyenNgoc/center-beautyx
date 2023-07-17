export type ReqDiscountBody = {
  title: string,
  coupon_code: string,
  description: string,
  platform: string,
  discount_type: string,
  discount_unit: string,
  items: number[] | string[],
  organizations: number | string,
  is_campaign: number,
  valid_from: string,
  valid_util: string,
  discount_value: number | string,
  total?: number,
  limit?: number,
  minimum_order_value?: number
}
export type ReqPromotionBody = {
  name?: string;
  content?: string;
  imageURL?: string;
  thumbnail?: string;
  discounts?: Array<number> | Array<string>;
  productables?: Array<number> | Array<string>;
  is_popup?: 0 | 1;
  valid_from?: string;
  valid_util?: string
}