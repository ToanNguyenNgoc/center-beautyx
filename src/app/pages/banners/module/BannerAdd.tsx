/* eslint-disable react-hooks/exhaustive-deps */
import TitlePage from 'components/TitlePage';
import { useLocation, useParams } from 'react-router-dom';
import '../style.scss';
import 'react-quill/dist/quill.snow.css';
import { useMutation, useQuery } from 'react-query';
import { QR_KEY } from 'common';
import { bannerApi } from 'app/api';
import { useFormik } from 'formik';
import { FileUploader } from 'react-drag-drop-files';
import { BANNERS_TYPE, BANNER_TYPE, FILE_IMG_TYPE, testLinkYoutube } from 'app/util';
import { IMGS } from '_metronic/assets/imgs/imgs';
import { CircularProgress, FormControl, LinearProgress, MenuItem, Select, TextField } from '@mui/material';
import { useMessage, usePostMedia } from 'app/hooks';
import { PLAT_FORM_ARR } from 'app/util';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import ReactQuill from 'react-quill';
import { IBanner, IOrganization } from 'app/interface';
import { LoadingButton } from '@mui/lab';
import * as Yup from "yup"
import { AxiosError } from 'axios';
import { AppSnack, SelectionOrg } from 'components';

function BannerAdd() {
    // useVerifyRoute()
    const location: any = useLocation()
    const prevPriority: number = location.state ?? 0
    const params: any = useParams();
    const { resultLoad, noti, onCloseNoti } = useMessage()
    const [origin, setOrigin] = useState<IOrganization>()
    const { isLoading, handlePostMedia } = usePostMedia()
    const { mutate, isLoading: isPosting } = useMutation({
        mutationFn: (body: any) => params.id ? bannerApi.putBanner(params.id, body) : bannerApi.postBanner(body),
        onSuccess: () => {
            resultLoad({
                message: `${params.id ? 'Cập nhật' : 'Tạo mới'} banner thành công`,
                color: 'success'
            })
        },
        onError: (errors: any) => {
            const err = errors as AxiosError
            resultLoad({
                color: 'error',
                message: `Có lỗi xảy ra. Mã lỗi ${err?.request?.status}`
            })
        }
    })
    let formik = useFormik({
        initialValues: {
            // priority: "",
            imageURL: "",
            name: "",
            platform: "",
            expires_at: "",
            type: "",
            htmlTemplate: "",
            url: ""
        },
        validationSchema: Yup.object({
            imageURL: Yup.string().required("Upload hình của banner"),
            name: Yup.string().required("Nhập tên của Banner"),
            // expires_at: Yup.string().required("Nhập ngày hết hạn Banner"),
            type: Yup.string().required('Chọn loại Banner'),
        }),
        onSubmit: (values) => {
            mutate({
                ...values,
                origin_id: origin?.id,
                priority: params.id ? undefined : prevPriority + 1
            })
        }
    })
    const { data, refetch, isFetching } = useQuery({
        queryKey: [QR_KEY.BANNER, params.id],
        queryFn: () => bannerApi.getDetailById(params.id),
        enabled: params.id ? true : false,
        onSuccess: (data) => {
            const banner = data.context
            formik.setFieldValue('name', banner.name)
            formik.setFieldValue('imageURL', banner.imageURL)
            formik.setFieldValue('platform', banner.platform ?? '')
            formik.setFieldValue('expires_at', banner.expires_at)
            formik.setFieldValue('type', banner.type ?? '')
            formik.setFieldValue('url', banner.url ?? '')
            formik.setFieldValue('htmlTemplate', banner.htmlTemplate ?? '')
            // formik.setFieldValue('priority', banner.priority ?? '')
        },
    })
    const handleChangeMedia = (file: File) => {
        formik.setFieldValue('imageURL', '')
        const eF: any = {
            target: {
                files: [file]
            }
        }
        handlePostMedia({
            e: eF,
            callBack(data) {
                formik.setFieldValue('imageURL', data[0]?.original_url ?? '')
            },
            version: 'myspa'
        })
    }
    return (
        <>
            <AppSnack
                severity={noti.color}
                message={noti.message}
                open={noti.openAlert}
                close={onCloseNoti}
            />
            <TitlePage title={params.id ? 'Cập nhật banner' : 'Tạo mới banner'} />
            <div className='post d-flex flex-column-fluid' id="kt_post">
                <div className="container cus-container">
                    <form className='banner-form' autoComplete='off' onSubmit={formik.handleSubmit}>
                        <div className="required form-label">Banner</div>
                        <div className="drag-banner">
                            <FileUploader
                                className="form-input-file"
                                style={{ width: '100%' }}
                                multiple={false}
                                handleChange={handleChangeMedia}
                                name="file"
                                types={FILE_IMG_TYPE}
                                children={
                                    <div className='banner-form__img'>
                                        <img src={formik.values.imageURL === "" ? IMGS.imgPlaceHolder : formik.values.imageURL} alt="" className="image-value" />
                                        {
                                            formik.values.imageURL === "" &&
                                            <div className="placeholder">
                                                <span>
                                                    {isLoading ? 'Đang tải' : 'Kéo thả hình ảnh vào đây hoặc Click để chọn hình ảnh'}
                                                </span>
                                                {isLoading && <LinearProgress />}
                                            </div>
                                        }
                                    </div>
                                }
                            />
                        </div>
                        <input
                            value={formik.values.imageURL}
                            onChange={formik.handleChange}
                            type="text"
                            name="imageURL"
                            className="form-control form-control-solid mt-4 mb-4"
                            placeholder="Hoặc link hình ảnh...."
                        />
                        {formik.errors.imageURL && formik.touched.imageURL && (
                            <span className='text-danger'>
                                {formik.errors.imageURL}
                            </span>
                        )}
                        <div className="input-form">
                            <div className="input-form__wrap">
                                <label className="required form-label">
                                    Tên Banners
                                </label>
                                <input
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    type="text"
                                    name="name"
                                    className="form-control form-control-solid"
                                    placeholder="Tên Banner"
                                />
                                {formik.errors.name && formik.touched.name && (
                                    <span className='text-danger'>
                                        {formik.errors.name}
                                    </span>
                                )}
                            </div>
                            <div className="row mt-8">
                                <div className="col">
                                    <label className="filter-row_label">Nền tảng</label>
                                    <FormControl size="small">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.platform}
                                            onChange={(e) => formik.setFieldValue('platform', e.target.value)}
                                        >
                                            <MenuItem value="">
                                                <em>Tất cả</em>
                                            </MenuItem>
                                            {
                                                PLAT_FORM_ARR.map(item => (
                                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col">
                                    <label className="filter-row_label">Ngày hết hạn</label>
                                    <DesktopDatePicker
                                        disablePast={true}
                                        inputFormat="dd/MM/yyyy"
                                        value={formik.values.expires_at && new Date(formik.values.expires_at)}
                                        onChange={(e) => formik.setFieldValue('expires_at', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                                        renderInput={(params: any) => <TextField {...params} />}
                                    />
                                    {formik.errors.expires_at && formik.touched.expires_at && (
                                        <span className='text-danger'>
                                            {formik.errors.expires_at}
                                        </span>
                                    )}
                                </div>
                                <div className="col">
                                    <label className="filter-row_label">Loại banner cho</label>
                                    <FormControl size="small">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.type}
                                            onChange={(e) => formik.setFieldValue('type', e.target.value)}
                                        >
                                            {
                                                BANNERS_TYPE.map(item => (
                                                    <MenuItem key={item.type} value={item.type}>{item.title}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    {formik.errors.type && formik.touched.type && (
                                        <span className='text-danger'>
                                            {formik.errors.type}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <RenderElement formik={formik} origin={origin} setOrigin={setOrigin} banner={data?.context} />
                        </div>
                        <div className="d-flex justify-content-end mt-6">
                            {
                                params.id &&
                                <LoadingButton
                                    style={{ marginRight: '8px' }}
                                    loading={isFetching}
                                    onClick={() => refetch()}
                                    size='large' color='primary' type='button' variant='contained'
                                >
                                    Khôi phục
                                </LoadingButton>
                            }
                            <LoadingButton loading={isPosting} size='large' color='success' type='submit' variant='contained' >
                                {params.id ? 'Lưu thay đổi' : 'Tạo mới banner'}
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default BannerAdd;
interface RenderElementProps {
    formik: any,
    origin: IOrganization | undefined
    setOrigin: Dispatch<SetStateAction<IOrganization | undefined>>
    banner: IBanner | undefined
}
const RenderElement: FC<RenderElementProps> = ({ formik, origin, setOrigin, banner }) => {
    const type = formik.values.type
    //[handle type === "VIDEO"]
    const { isLoading: isLoadingVideo, handlePostMedia } = usePostMedia()
    const handleChangeVideo = (e: ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue('url', '')
        handlePostMedia({
            e,
            callBack(data) {
                formik.setFieldValue('url', data[0]?.original_url)
            },
            version: 'media.beautyx'
        })
    }
    const { isYoutubeLink, embedLink } = testLinkYoutube(formik.values.url)

    return (
        <div className='mt-8'>
            {
                (type === BANNER_TYPE.SEARCH_RESULT || type === BANNER_TYPE.WEB) &&
                <div className="col">
                    <label className="filter-row_label">Đường dẫn</label>
                    <input
                        name='url' onChange={formik.handleChange}
                        type="text" className="form-control form-control-solid"
                        value={formik.values.url}
                        placeholder='Đường dẫn URL...'
                    />
                </div>
            }
            {
                (type === BANNER_TYPE.HTML) &&
                <div className="col">
                    <label className="filter-row_label">Nhập content</label>
                    <ReactQuill value={formik.values.htmlTemplate} onChange={(e) => formik.setFieldValue('htmlTemplate', e)} />
                </div>
            }
            {
                type === BANNER_TYPE.ORGANIZATION &&
                <SelectionOrg
                    organization_id={banner?.origin_id}
                    origin={origin}
                    setOrigin={setOrigin}
                />
            }
            {
                type === BANNER_TYPE.VIDEO &&
                <div className="col col-video">
                    <label className="filter-row_label">Upload video</label>
                    <div className="drag-video">
                        <input
                            name="url"
                            onChange={formik.handleChange}
                            value={formik.values.url}
                            type="text" placeholder='Hoặc link video'
                            className="form-control form-control-solid"
                        />
                        <input onChange={handleChangeVideo} hidden id='video' type="file" accept="video/mp4, video/mov, video/avi, video/wmv" />
                        <label htmlFor="video" className='btn btn-primary p-2'>
                            <i className="bi bi-cloud-arrow-up-fill"></i>
                            Tải video lên
                        </label>
                        <div className="video-placeholder d-flex justify-content-center mt-5">
                            <div className="video d-flex flex-column align-item-center">
                                {
                                    isLoadingVideo &&
                                    <div className="video-load d-flex flex-column align-items-center">
                                        Đang tải video lên...
                                        <CircularProgress size={22} />
                                    </div>
                                }
                                {
                                    formik.values.url !== "" &&
                                    <>
                                        {
                                            isYoutubeLink ?
                                                <iframe src={embedLink}
                                                    frameBorder='0'
                                                    allow='autoplay; encrypted-media'
                                                    allowFullScreen
                                                    title="Media"
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                                :
                                                <video controls>
                                                    <source src={formik.values.url} />
                                                </video>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}