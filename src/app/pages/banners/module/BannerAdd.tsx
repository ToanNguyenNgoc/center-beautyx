/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import TitlePage from '../../../../components/TitlePage';
import '../style.scss';
import 'react-quill/dist/quill.snow.css';
import { fetchAsyncBannerDetail, onResetFormBanner } from '../../../redux/banner/bannerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IRoot } from '../../../redux/interface';
import BannerForm from './BannerForm';
import { STATUS } from '../../../redux/status';
import { useVerifyRoute } from 'app/hooks';
import { useParams } from 'react-router-dom';


function BannerAdd() {
    // useVerifyRoute()
    const params: any = useParams();
    const { status, banner } = useSelector((state: IRoot) => state.BANNER.bannerDetail);
    const dispatch = useDispatch();

    const callBannerDetailById = () => {
        if (params?.id) return dispatch(fetchAsyncBannerDetail(params?.id))
        if (!params.id) return dispatch(onResetFormBanner())
    }
    useEffect(() => {
        callBannerDetailById()
    }, [])



    //handle form
    return (
        <>
            <TitlePage title='Tạo mới Banner' />
            {
                (!params.id || status === STATUS.SUCCESS) &&
                <BannerForm
                    bannerDetail={banner}
                    params={params}
                />
            }
        </>
    );
}

export default BannerAdd;