import { IDiscountPar, IITEMS_DISCOUNT } from "../interface/discounts";
import { IService } from "../interface/service";
import { PRODUCTABLE_TYPE } from "./fileType";

export const extraServicesDiscount = (discount: IDiscountPar) => {
    let servicesDiscount: any[] = []
    if (discount?.items) {
        servicesDiscount = discount.items
            .filter((i: IITEMS_DISCOUNT) => i.productable_type === PRODUCTABLE_TYPE.SERVICE)
            .map((item: IITEMS_DISCOUNT) => {
                return {
                    ...item.productable,
                    org: item.organization
                }
            })
    }
    return servicesDiscount
}