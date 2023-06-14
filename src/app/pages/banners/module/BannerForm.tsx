/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import mediaApi from '../../../api/mediaApi';
import { FileUploader } from 'react-drag-drop-files';
import { FILE_IMG_TYPE, BANNER_TYPE } from '../../../util/fileType';
import { IMGS } from '../../../../_metronic/assets/imgs/imgs';
import { IBanner } from '../../../interface/banner';
import { useDispatch } from 'react-redux';
import {
    fetchAsyncBannerDetail,
    onChangeValueBanner,
    postAsyncBanner
} from "../../../redux/banner/bannerSlice"
import BannerAddPlatForm from './BannerAddPlatForm';
import BannerAddType from './BannerAddType';
import BannerAddRender from './BannerAddRender';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { format } from "date-fns";

interface IProps {
    bannerDetail: IBanner,
    params: any
}

function BannerForm(props: IProps) {
    const { bannerDetail, params } = props;
    const dispatch = useDispatch();
    const platFormListRef = useRef<any>(null);
    const typeBannerRef = useRef<any>(null);
    const [loadImg, setLoadImg] = useState(false);

    const handleChange = (file: any) => {
        const form = file;
        handlePostMedia(form)
    };
    const handlePostMedia = async (form: any) => {
        let formData = new FormData();
        formData.append('file', form);
        setLoadImg(true)
        try {
            const res = await mediaApi.postMedia(formData)
            dispatch(onChangeValueBanner({
                imageURL: res.data.context.original_url
            }))
            setLoadImg(false);
        } catch (error) {
            console.log(error)
            setLoadImg(false)
        }
    }
    const onChangeInputName = useCallback((e: any) => {
        dispatch(onChangeValueBanner({
            name: e.target.value
        }))
    }, [])
    const onChangeDate = (newValue: Date | null) => {
        const dateValue: any = newValue
        const x = format(dateValue, "yyyy-MM-dd 00:00:00");
        dispatch(onChangeValueBanner({
            expires_at: x
        }))
    }
    const onTogglePlatFormList = () => {
        platFormListRef?.current?.classList.toggle("plat-form-act")
        typeBannerRef?.current?.classList?.remove("plat-form-act")
    }
    const onToggleBannerType = () => {
        typeBannerRef?.current?.classList?.toggle("plat-form-act")
        platFormListRef?.current?.classList.remove("plat-form-act")
    }
    const onRestoreFormEdit = () => {
        if (params?.id !== "" && params) {
            dispatch(fetchAsyncBannerDetail(params?.id))
        }
    }
    //handle POST,PUT banner
    const handlePostBanner = () => {
        const values = {
            name: bannerDetail.name,
            imageURL: bannerDetail.imageURL,
            type: bannerDetail.type,
            platform: bannerDetail.platform,
            htmlTemplate: bannerDetail.htmlTemplate,
            url: bannerDetail.url,
            expires_at: bannerDetail.expires_at,
            origin_id: bannerDetail.origin_id,
        }
        dispatch(postAsyncBanner(values))
    }
    const onPostBanner = () => {
        if (bannerDetail.name !== "" && bannerDetail.imageURL !== "") {
            if (bannerDetail.type === BANNER_TYPE.HTML && bannerDetail.htmlTemplate !== "") {
                //console.log(bannerDetail)
                handlePostBanner()
            }
            if ((bannerDetail.type === BANNER_TYPE.WEB ||
                bannerDetail.type === BANNER_TYPE.SEARCH_RESULT ||
                bannerDetail.type === BANNER_TYPE.VIDEO) &&
                bannerDetail.url !== "") {
                //console.log(bannerDetail)
                handlePostBanner()
            }
            if ((bannerDetail.type === BANNER_TYPE.ORGANIZATION ||
                bannerDetail.type === BANNER_TYPE.DISCOUNT) &&
                bannerDetail.origin_id) {
                //console.log(bannerDetail)
                handlePostBanner()
            }
        }
    }
    return (
        <div className='post d-flex flex-column-fluid' id="kt_post">
            <div className="container cus-container">
                <div className="banner-form">
                    <div className="banner-form_media">
                        <label className="form-label">
                            <span className="required">
                                Banner
                            </span>
                        </label>
                        <FileUploader
                            className="form-input-file"
                            multiple={false}
                            handleChange={handleChange}
                            name="file"
                            types={FILE_IMG_TYPE}
                            children={
                                <div className='banner-form__img'>
                                    {
                                    bannerDetail.imageURL !== "" ?
                                        <img src={bannerDetail.imageURL} alt="" className="img-temp" />
                                        :
                                        <div className="flex-col-al banner-form__img-place">
                                            <img src={IMGS.imgPlaceHolder} alt="" />
                                            <span>
                                                {loadImg ? "Đang tải lên..." : "Kéo thả hình ảnh vào đây hoặc Click để chọn hình ảnh"}
                                            </span>
                                        </div>
                                }
                                </div>
                            }
                        />
                    </div>
                    <div
                        className="input-form"
                    >
                        <div className="input-form__wrap">
                            <label className="form-label">
                                <span className="required">Tên Banners</span>
                            </label>
                            <input
                                value={bannerDetail.name}
                                onChange={onChangeInputName}
                                type="text"
                                className="form-control form-control-solid"
                                placeholder="Tên Banner"
                            />
                        </div>
                        <BannerAddPlatForm
                            bannerDetail={bannerDetail}
                            platFormListRef={platFormListRef}
                            onTogglePlatFormList={onTogglePlatFormList}
                        />
                        <div className="flex-row-sp grid-col-2">
                            <BannerAddType
                                bannerDetail={bannerDetail}
                                typeBannerRef={typeBannerRef}
                                onToggleBannerType={onToggleBannerType}
                            />
                            <div className="flex-col input-form__wrap">
                                <label className="form-label">Ngày hết hạn</label>
                                <DesktopDatePicker
                                    disablePast={true}
                                    inputFormat="dd/MM/yyyy"
                                    value={bannerDetail.expires_at && new Date(bannerDetail.expires_at)}
                                    onChange={onChangeDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                        </div>
                        <BannerAddRender
                            bannerDetail={bannerDetail}
                        />

                        <div className="input-form__bot">
                            {
                                params?.id &&
                                <button onClick={onRestoreFormEdit} className="btn btn-light">
                                    Khôi phục
                                </button>
                            }
                            <button
                                onClick={onPostBanner}
                                className="btn btn-success"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerForm;