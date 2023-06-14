export interface IProductSingle {
  bought_count: number | null
  branch_id: number | null
  branch_is_active: boolean
  category_name: string | null
  created_date: string | null
  description: string | null
  discount_percent: number | null
  discount_percent_ecommerce: number | null
  favorites_count: number | null
  id: string | null
  image_url: string | null
  is_featured: boolean
  is_momo_ecommerce_enable: boolean
  modified_date: string | null
  org_district_code: number | null
  org_district_name: string | null
  org_full_address: string | null
  org_id: number | null
  org_image: string | null
  org_latitude: number | null
  org_longitude: number | null
  org_name: string | null
  org_priority: number
  org_province_code: number | null
  org_province_name: string | null
  org_telephone: []
  product_id: number | null
  product_name: string | null
  rating: number
  retail_price: number
  special_price: number
  special_price_momo: number
  _geo: [lat: number | null, lng: number | null]
}
