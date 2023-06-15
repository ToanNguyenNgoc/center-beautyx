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
export type ReqDiscount = {
  page?: number | string;
  limit?: number | string;
  'filter[platform]'?: string;
  'filter[discount_type]'?: "SUB_TOTAL" | "FINAL_PRICE" | "PRODUCT" | "" | string;
  'filter[organization_id]'?: number | string;
  'filter[location]'?: string;
  'sort'?: string;
  'append'?: "" | "user_available_purchase_count"
}
export type ReqDiscountDetail = {
  id: string;
  'filter[organization_id]'?: number | string
}