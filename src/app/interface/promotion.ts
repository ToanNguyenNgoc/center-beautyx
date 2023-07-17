import { IDiscountPar } from "app/interface/discounts";
import { Productable } from "app/interface/productable";

export interface Promotion {
  id: number,
  name: string,
  content: string,
  imageURL: string,
  thumbnail: string,
  is_popup: 0|1,
  valid_from: string,
  valid_util: string,
  created_at: string,
  updated_at: string,
  discounts:IDiscountPar[],
  productables:Productable[]
}