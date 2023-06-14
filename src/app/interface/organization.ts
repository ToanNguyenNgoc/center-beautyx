
export interface IBranch {
    address: string;
    created_at: string;
    district: string | null;
    district_code: string | null;
    full_address: string;
    id: number;
    image: string | null;
    image_url: string;
    latitude: number;
    longitude: number;
    name: string;
    organization_id: number;
    origin_id: number;
    province: number | string | null;
    province_code: number | string | null;
    telephone: string;
    ward: string | null;
    ward_code: string | null;
}

export interface IOrganization {
    id: number;
    name: string;
    subdomain: string;
    latitude: number;
    longitude: number;
    address: string;
    min_price: number;
    max_price: number;
    image: string;
    is_momo_ecommerce_enable: boolean;
    created_at: string;
    updated_at: string;
    province_code: number;
    district_code: number;
    ward_code: number;
    full_address: string;
    image_url: string;
    branches: IBranch[];
    opening_time: any;
    favorites_count: number;
    is_favorite?: boolean | null;
    favorites: any[];
    distance?: number;
    tags: any[];
    telephone?: string[];
}
export const initOrg = {
    id: 0,
    name: "",
    subdomain: "",
    latitude: 0,
    longitude: 0,
    address: "",
    min_price: 0,
    max_price: 0,
    image: "",
    is_momo_ecommerce_enable: false,
    created_at: "",
    updated_at: "",
    province_code: 0,
    district_code: 0,
    ward_code: 0,
    full_address: "",
    image_url: "",
    branches: [],
    opening_time: [],
    favorites_count: 0,
    is_favorite: false,
    favorites: [],
    distance: 0,
    tags: [],
    telephone: [],
}
