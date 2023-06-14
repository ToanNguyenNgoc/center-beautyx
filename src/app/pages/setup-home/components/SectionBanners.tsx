/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { IDataLayout } from '../data';
import style from './cpn-style.module.scss';
import { IBanner } from 'app/interface/banner';
import { settingsSlick } from 'app/util';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { IRoot } from 'app/redux/interface';
import { fetchAsyncBanners } from 'app/redux/setup-home';

interface SectionBannersProps {
    sectionBanner: IDataLayout
}

export function SectionBanners(props: SectionBannersProps) {
    const { sectionBanner } = props
    const dispatch = useDispatch()
    const settings = settingsSlick()
    const refContainer = useRef<any>()
    const clientHeight = refContainer?.current ? refContainer?.current?.clientWidth / 2.5 : 121
    useEffect(() => {
        dispatch(fetchAsyncBanners())
    }, [])
    const { sectionFocus, banners } = useSelector((state: IRoot) => state.HOME_SETUP)
    return (
        <div
            ref={refContainer}
            style={{ height: clientHeight }}
            className={
                sectionBanner.id === sectionFocus?.id ?
                    `${style.section_banner_cnt} ${style.section_focus}`
                    :
                    `${style.section_banner_cnt}`
            }
        >
            <Slider {...settings} >
                {
                    banners.map((item: IBanner, index: number) => (
                        <div key={index} className={style.banner_item}>
                            <img
                                style={{ height: clientHeight }}
                                className={style.banner_item_img} alt="" src={item.imageURL}
                            />
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
}