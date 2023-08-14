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
  main_media_id?: number;
  thumbnail_media_id?: number;
  discounts?: Array<number> | Array<string>;
  productables?: Array<number> | Array<string>;
  is_popup?: 0 | 1;
  valid_from?: string;
  valid_util?: string
}
export type ReqPostBody = {
  content: string;
  organization_id?: number;
  media_ids?: number[];
  status?: number;
  tag_id?: number;
  service_ids?: number[]
}