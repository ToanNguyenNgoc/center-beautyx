/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BANNER_TYPE, FILE_VIDEO_TYPE } from '../../../util/fileType'
import { PLAT_FORM } from "../../../util/platForm"
import ReactQuill, { Quill } from 'react-quill';
import { IOrganization, initOrg } from '../../../interface/organization';
import orgApi from '../../../api/orgApi';
import _, { debounce } from "lodash";
import { FileUploader } from 'react-drag-drop-files';
import mediaApi from '../../../api/mediaApi';
import { IMGS } from '../../../../_metronic/assets/imgs/imgs';
import { IBanner } from '../../../interface/banner';
import { useDispatch } from 'react-redux';
import { onChangeValueBanner } from "../../../redux/banner/bannerSlice"

interface IProps {
    bannerDetail: IBanner
}

function BannerAddRender(props: IProps) {
    const { bannerDetail } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [orgs, setOrgs] = useState<IOrganization[]>([])
    const [key, setKey] = useState("");
    const getOrgDetail = async () => {
        if (bannerDetail.type === "ORGANIZATION" && bannerDetail.origin_id) {
            const res = await orgApi.getOrgById(bannerDetail.origin_id)
            setKey(res.data.context.name)
        }
    }
    useEffect(() => {
        getOrgDetail()
    })
    const listOrgRef = useRef<HTMLUListElement>(null)
    //platform otg
    const callOrgByKeyWord = async (keyword: string) => {
        try {
            const res = await orgApi.getAll({
                keyword: keyword
            })
            setOrgs(res.data.context.data)
        } catch (error) {
            console.log(error)
        }
    }
    const debounceDropDown = useCallback(
        debounce((nextValue) => {
            callOrgByKeyWord(nextValue);
        }, 1000),
        []
    );
    const onChangeOrg = (e: any) => {
        if (e.target.value) {
            setOrgs([])
        }
        setKey(e.target.value)
        debounceDropDown(e.target.value)
    }
    const onOrgChoose = (i: any) => {
        console.log(i)
        dispatch(onChangeValueBanner({
            origin_id: i?.id
        }))
        setKey(i?.name)
        listOrgRef.current?.classList?.remove("search-list-show")
    }
    //------------
    //plat form video
    const handleChangeVideo = (file: any) => {
        const form = file;
        handlePostMedia(form)
    };
    const handlePostMedia = async (form: any) => {
        let formData = new FormData();
        formData.append('file', form);
        setLoading(true)
        try {
            const res = await mediaApi.postMedia(formData)
            dispatch(onChangeValueBanner({
                ...bannerDetail,
                url: res.data.context.original_url
            }))
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    //------------
    //flat from HTML
    const onChangeTextEditor = (e: any) => {
        dispatch(onChangeValueBanner({
            ...bannerDetail,
            htmlTemplate: e
        }))
    }
    //------------
    const handleChangeUrl = useCallback((e: any) => {
        dispatch(onChangeValueBanner({
            url: e.target.value
        }))
    }, [])
    return (
        <>
            {
                bannerDetail.type === BANNER_TYPE.ORGANIZATION &&
                <div className="input-form__wrap">
                    <label className="form-label">
                        <span className="required">
                            Tên doanh nghiệp
                        </span>
                    </label>
                    <input
                        type="text"
                        value={key}
                        onChange={onChangeOrg}
                        onFocus={() => listOrgRef.current?.classList?.add("search-list-show")}
                        onBlur={() => listOrgRef.current?.classList?.remove("search-list-show")}
                        className="form-control form-control-solid"
                        placeholder="Tìm kiếm doanh nghiệp..."
                    />
                    <ul ref={listOrgRef} className="search-list">
                        {
                            orgs.map((item: IOrganization, index: number) => (
                                <li onClick={() => onOrgChoose(item)} key={index} >
                                    <img src={item?.image_url} alt="" className="avatar" />
                                    {item?.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
            {
                (bannerDetail.type === BANNER_TYPE.SEARCH_RESULT || bannerDetail.type === BANNER_TYPE.WEB) &&
                <div className="input-form__wrap">
                    <label className="form-label">
                        <span className="required">
                            Dường dẫn Url
                        </span>
                    </label>
                    <input
                        value={bannerDetail.url}
                        onChange={handleChangeUrl}
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Dường dẫn Url..."
                    />
                </div>
            }
            {
                bannerDetail.type === BANNER_TYPE.HTML &&
                <div className="input-form__wrap">
                    <label className="form-label">
                        <span className="required">
                            Viết Blog
                        </span>
                    </label>
                    <ReactQuill
                        value={bannerDetail.htmlTemplate}
                        onChange={onChangeTextEditor}
                    />
                </div>
            }
            {
                bannerDetail.type === BANNER_TYPE.VIDEO &&
                <div className="input-form__wrap">
                    <label className="form-label">
                        <span className="required">
                            Upload video
                        </span>
                    </label>
                    <FileUploader
                        multiple={false}
                        name="file"
                        types={FILE_VIDEO_TYPE}
                        handleChange={handleChangeVideo}
                        children={
                            <div className='banner-form__img'>
                                {
                                    bannerDetail.url !== "" ?
                                        <video
                                            className='banner-form__img-video'
                                            controls
                                        >
                                            <source src={bannerDetail.url} />
                                        </video>
                                        :
                                        <div className="flex-col-al banner-form__img-place">
                                            <img src={IMGS.imgPlaceHolder} alt="" />
                                            <span>
                                                {
                                                    loading ? "Đang tải video lên..." : " Kéo thả Video vào đây hoặc Click để chọn Video"
                                                }
                                            </span>
                                        </div>
                                }
                            </div>
                        }
                    />
                </div>
            }
        </>
    );
}

export default BannerAddRender;