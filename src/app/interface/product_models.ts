interface _geo {
  lat: Float32Array
  lng: Float32Array
}
export interface IPRODUCT {
  branch_id: number
  brand_id: number
  is_product: true
  commission_money: number
  commission_percen: number
  commission_plan: number
  created_by_id: number
  created_date: string
  deleted: boolean
  description: string
  id: number
  image: string
  image_url: string
  is_featured: boolean
  is_momo_ecommerce_enable: boolean
  medicine: number
  modified_date: string
  origin_price: number
  product_category_id: number
  product_code: string
  product_name: string
  product_order: number
  product_sku: string
  product_type: number
  retail_price: number
  reward_money: number
  reward_percent: number
  special_price: number
  status: boolean
  unit2_id: number | string | null
  unit_id: number
  unit_ratio: number | string | null
  rating: number
  is_favorite: boolean
  favorites_count: number
}
export interface IHIT_PRODUCT {
  _geo: _geo
  bought_count: number
  branch_id: null|number|string
  branch_is_active: boolean
  category_name:string
  created_date:string
  description:string
  discount_percent: number|string
  favorites_count: number|string
  id:string
  image_url: null
  is_featured: false
  is_momo_ecommerce_enable: true
  modified_date:string
  org_district_code: number|string
  org_district_name:string
  org_full_address:string
  org_id: number|string
  org_image:string
  org_latitude: Float32Array
  org_longitude: Float32Array
  org_name:string
  org_priority: number
  org_province_code: number
  org_province_name:string
  org_telephone: string[]
  product_id: number
  product_name:string
  rating: number
  retail_price: number
  special_price: number
}
