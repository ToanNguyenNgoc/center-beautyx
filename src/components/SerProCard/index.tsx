import React from 'react';
import style from './ser.module.scss'
import onErrorImg from 'app/util/onErrorImg';
import { formatPrice, formatSalePriceService } from 'app/util/format';

interface SerProCardProps {
    item: any,
    org_id?: number,
    type?: "SERVICE" | "PRODUCT"
}

export function SerProCard(props: SerProCardProps) {
    const { item, type } = props;
    let productable_type = type
    if (item?.service_name) productable_type = "SERVICE"
    if (item?.product_name) productable_type = "PRODUCT"
    const special_price = formatSalePriceService(item?.special_price, item?.split)
    const name = item?.service_name ?? item?.product_name
    const onDetail = () => {
        if (productable_type === "SERVICE") {

        }
    }
    return (
        <div onClick={onDetail} className={style.container}>
            <div className={style.img_cnt}>
                <img onError={(e) => onErrorImg(e)} src={item?.image_url} className={style.image_url} alt="" />
            </div>
            <div className={style.detail_cnt}>
                <span className={style.item_name}>{name}</span>
                <div className={style.item_price}>
                    {
                        special_price > 0 &&
                        <span>{formatPrice(special_price)}đ</span>
                    }
                    <span>{formatPrice(item?.price ?? item?.retail_price)}đ</span>
                </div>
            </div>
        </div>
    );
}