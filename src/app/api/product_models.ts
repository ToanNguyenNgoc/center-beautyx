export interface IPRODUCT_GET_ALL {
  page?: number
  limit?: number
  keyword?: string
  min_price?: string
  max_price?: string
  special_min_price?: string
  special_max_price?: string
  discount_percent?: string
  special_price?: string
  is_momo_ecommerce_enable?: boolean
  sort?:
    | 'distance'
    | 'org_priority'
    | 'product_name'
    | 'discount_percent'
    | 'retail_price'
    | 'modified_date'
    | 'created_date'
    | 'bought_count'
    | 'random'
    | null
}
export interface IPRODUCT_DETAIL_BY_ID {
  org_id: string | number
  id: string | number
}
export interface IPRODUCT_DETAIL_BY_ORG_ID extends IPRODUCT_DETAIL_BY_ID{
  page?: number
  limit?: number
  keyword?: string
  special?: Boolean
  cate_id?: number | string
  isEnable?: Boolean
}
