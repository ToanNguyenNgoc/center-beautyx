import { IDiscountPar } from "app/interface/discounts";
import { Media, Productable } from "app/interface/productable";

export interface Promotion {
  id: number,
  name: string,
  content: string,
  media_url: string | null,
  thumbnail_url: string | null,
  media: Media[],
  is_popup: 0 | 1,
  valid_from: string,
  valid_util: string,
  created_at: string,
  updated_at: string,
  discounts: IDiscountPar[],
  productables: Productable[]
}