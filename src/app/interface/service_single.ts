export interface IServiceSingle {
  bought_count: number | null
  branch_full_address: string | null
  branch_id: number | null
  branch_image_url: string | null
  branch_is_active: boolean
  branch_latitude: number | null
  branch_longitude: number | null
  branch_origin_id: number | null
  branch_province_code: number | null
  branch_province_name: string | null
  category_name: string | null
  created_date: string | null
  description: string | null
  discount_percent: number | null
  discount_percent_ecommerce: number | null
  duration: number | null
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
  org_latitude: number
  org_longitude: number
  org_name: string | null
  org_priority: number
  org_province_code: number | null
  org_province_name: string | null
  org_telephone: []
  price: number
  rating: number
  service_id: number | null
  service_name: string | null
  special_price: number
  special_price_momo: number
  _geo: [lat: number, lng: number]
}
