/* eslint-disable react-hooks/exhaustive-deps */
import { Box, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppSnack, FlatFormOrder, SelectionOrgMultiple, XDateRangePicker, XSwitch } from 'components'
import moment from 'moment';
import { useMutation } from 'react-query';
import { ReqDiscountBody } from '@types';
import { discountsApi } from 'app/api';
import { LoadingButton } from '@mui/lab';
import { IDiscountPar, IITEMS_DISCOUNT } from 'app/interface';
import {
    DISCOUNTS_TYPE,
    DISCOUNT_TYPE,
    DISCOUNT_UNIT,
    DISCOUNT_UNIT_ARR,
    PLAT_FORM,
    PLAT_FORM_ARR,
    formatPrice
} from 'app/util';
import { useMessage } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { SelectService } from './select-service';
import { ExportCode } from './export-code'


interface IProps {
    discount: IDiscountPar | undefined,
    isForm: string,
    onRestoreFormEdit?: () => void
}

function Form(props: IProps) {
    const generateCode = moment().format('MMDDss')
    const { discount, isForm } = props;
    const { resultLoad, onCloseNoti, noti } = useMessage()
    const navigate = useNavigate()
    const [isCampaign, setIsCampaign] = useState(discount?.is_campaign ?? false)
    const [services, setServices] = useState<any>(
        isForm === "EDIT" ?
            discount?.items.map((item: IITEMS_DISCOUNT) => item.productable) : []
    )
    //handle submit form
    //[HANDLE POST]
    const { mutate, isLoading } = useMutation({
        mutationFn: (body: ReqDiscountBody) => discount ? discountsApi.putDiscount(discount.id, body) : discountsApi.postDiscount(body),
        onSuccess: (data) => {
            resultLoad({
                message: discount ? 'Cập nhật thành công' : 'Tạo thành công',
                color: 'success'
            })
            // const uuid = data.data?.context?.uuid
            setTimeout(() => navigate(-1), 2000)
        },
        onError: (error, variables, context) => {
            resultLoad({
                message: 'Có lỗi xảy ra',
                color: 'error'
            })
        },
    })

    //handle form
    const formik = useFormik({
        initialValues: {
            priority: isForm === "EDIT" ? discount?.priority : 0,
            coupon_code: isForm === "EDIT" ? discount?.coupon_code : "",
            title: isForm === "EDIT" ? discount?.title : "",
            description: isForm === "EDIT" ? discount?.description : "",
            platform: (isForm === "EDIT" && discount?.platform) ?
                discount?.platform?.split("|")?.filter(Boolean)
                :
                [],
            discount_type: isForm === "EDIT" ? discount?.discount_type : "",
            discount_unit: isForm === "EDIT" ? discount?.discount_unit : "",
            discount_value: isForm === "EDIT" ? discount?.discount_value : "",
            organizations: isForm === "EDIT" ? discount?.organizations : [],
            total: (isForm === "EDIT" && discount?.total) ? discount?.total : "",
            valid_from: (isForm === "EDIT" && discount?.valid_from) ? discount?.valid_from : moment().format('YYYY-MM-DD HH:mm:ss'),
            valid_util: (isForm === "EDIT" && discount?.valid_util) ? discount?.valid_util : moment().format('YYYY-MM-DD HH:mm:ss'),
            minimum_order_value: (isForm === "EDIT" && discount?.maximum_discount_value) ? discount?.maximum_discount_value : "",
            limit: (isForm === "EDIT" && discount?.limit) ? discount?.limit : ""
        },
        validationSchema: Yup.object({
            coupon_code: Yup.string().required("Vui lòng nhập Mã giảm giá"),
            title: Yup.string().required("Vui lòng nhập tên chương trình khuyến mại"),
            description: Yup.string().required("Vui lòng nhập mô tả chương trình khuyến mại"),
            discount_type: Yup.string().required("Vui lòng chọn hình thức giảm giá"),
            discount_unit: Yup.string().required("Vui lòng chọn loại giảm giá "),
            discount_value: Yup.string().required("Vui lòng nhập giá trị giảm"),
            platform: Yup.array().min(1, "Vui lòng chọn nền tảng áp dụng"),
            organizations: Yup.array().min(1, "Vui lòng chọn Doanh nghiệp"),
            total: isCampaign ? Yup.number().min(0, 'Số lượng mã tối đa 2000 mã')
                .max(2000, 'Số lượng mã tối đa 2000 mã')
                .required('Vui lòng nhập số lượng mã')
                :
                Yup.string()
        }),
        onSubmit: (values) => {
            const newValue = values as any
            const body = {
                ...newValue,
                organizations: values.organizations?.map(i => i.id)[0],
                items: services.map((i: any) => i.id),
                platform: newValue.platform[0] ?? 'MOMO',
                is_campaign: isCampaign ? 1 : 0,
                limit:Number(values.limit)
            }
            if (services.length > 0) {
                mutate(body)
            }
        },
    })
    const minPriceItem = Math.min.apply(null, services.map((i: any) => i?.price));
    let totalServicesPrice = 0;
    if (services.length > 0) {
        totalServicesPrice = services
            ?.map((i: any) => i?.price)
            ?.reduce((pre: number, cur: number) => pre + cur)
    }

    const onChangeInputDiscountValue = (e: any) => {
        if (formik.values.discount_unit === DISCOUNT_UNIT.PERCENT) {
            if (parseInt(e.target.value) < 100 || e.target.value === "") {
                formik.setFieldValue("discount_value", e.target.value)
            }
        } else if (formik.values.discount_unit === DISCOUNT_UNIT.PRICE) {
            if (formik.values.discount_type === DISCOUNT_TYPE.PRODUCTS) {
                if (parseInt(e.target.value) < minPriceItem || e.target.value === "") {
                    formik.setFieldValue("discount_value", e.target.value)
                }
            } if (formik.values.discount_type === DISCOUNT_TYPE.SUB_TOTAL) {
                if (parseInt(e.target.value) < totalServicesPrice || e.target.value === "") {
                    formik.setFieldValue("discount_value", e.target.value)
                }
            } if (formik.values.discount_type === DISCOUNT_TYPE.FINAL_PRICE) {
                if (parseInt(e.target.value) < minPriceItem || e.target.value === "") {
                    formik.setFieldValue("discount_value", e.target.value)
                }
            }
        }
    }
    const onChangeInputTotal = (e: any) => {
        if (e.target.value > 0 || e.target.value === "") {
            formik.setFieldValue("total", e.target.value)
            formik.setFieldValue("limit", "")
        }
    }
    const onChangeMinimumOrderValue = (e: any) => {
        if (formik.values.discount_type === DISCOUNT_TYPE.SUB_TOTAL) {
            if (formik.values.discount_value === "") {
                formik.setFieldValue("minimum_order_value", e.target.value)
            }
            // formik.setFieldValue("minimum_order_value", e.target.value)
        }
    }

    const onChangeInputLimit = (e: any) => {
        const total = parseInt(`${formik.values.total}`)
        if (formik.values.total === "") {
            return formik.setFieldValue("limit", e.target.value)
        }
        if ((typeof total === "number" && parseInt(e.target.value) < total) || e.target.value === "") {
            return formik.setFieldValue("limit", e.target.value)
        }
    }
    // console.log(services)


    return (
        <>
            <AppSnack
                severity={noti.color}
                message={noti.message}
                open={noti.openAlert}
                close={onCloseNoti}
            />
            <form
                className="discount-form"
                onSubmit={formik.handleSubmit}
                autoComplete="off"
            >
                <div className="flex-row-sp align-items-center input-wrap">
                    <div className="wrap-item">
                        <XSwitch
                            value={isCampaign}
                            onChange={(e) => setIsCampaign(e.target.checked)}
                            label='Is campaign (Áp dụng mã giảm giá Shopee, VinId)'
                        />
                    </div>
                </div>
                <div className="flex-row-sp input-wrap">
                    <div className="wrap-item">
                        <label className="form-label">Độ ưu tiên</label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.priority}
                            name="priority"
                            type="number"
                            className="form-control form-control-solid"
                            placeholder="Độ ưu tiên"
                        />
                    </div>
                </div>
                <div className="flex-row-sp input-wrap">
                    <div className="wrap-item">
                        {
                            isForm === "ADD" ?
                                <label className="required form-label">Mã giảm giá (org subdomain + {generateCode})</label>
                                :
                                <label className="required form-label">Mã giảm giá</label>
                        }
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.coupon_code}
                            name="coupon_code"
                            type="text"
                            className="form-control form-control-solid"
                            placeholder={`Example:ORG${generateCode}`}
                        />
                        {formik.errors.coupon_code && formik.touched.coupon_code && (
                            <span className='text-danger'>
                                {formik.errors.coupon_code}
                            </span>
                        )}
                    </div>
                    <div className="wrap-item">
                        <label className="required form-label">Tên</label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            name="title"
                            type="text"
                            className="form-control form-control-solid"
                            placeholder="Chương trình khuyến mại"
                        />
                        {formik.errors.title && formik.touched.title && (
                            <span className='text-danger'>
                                {formik.errors.title}
                            </span>
                        )}
                    </div>
                </div>
                <div className="input-wrap">
                    <label className="required form-label">Mô tả</label>
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        name="description"
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Mô tả chương trình khuyến mại"
                    />
                    {formik.errors.description && formik.touched.description && (
                        <span className='text-danger'>
                            {formik.errors.description}
                        </span>
                    )}
                </div>

                <div className="flex-col input-wrap">
                    <label className="required form-label">Áp dụng cho nền tảng</label>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={formik.values.platform}
                        onChange={formik.handleChange}
                        name="platform"
                        renderValue={(selected: any) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected?.map((value: any) => (
                                    <FlatFormOrder
                                        key={value}
                                        platForm={value}
                                    />
                                ))}
                            </Box>
                        )}
                    >
                        {PLAT_FORM_ARR.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.errors.platform && formik.touched.platform && (
                        <span className='text-danger'>
                            {formik.errors.platform}
                        </span>
                    )}
                </div>
                {/* orgs select */}
                <div className="flex-col input-wrap">
                    <SelectionOrgMultiple
                        label='Doanh nghiệp được áp dụng'
                        origins={formik.values.organizations}
                        onChangeOrigin={(orgs) => {
                            setServices([])
                            formik.setFieldValue('organizations', orgs)
                        }}
                    />
                    {formik.errors.organizations && formik.touched.organizations && (
                        <span className='text-danger'>
                            {formik.errors.organizations}
                        </span>
                    )}
                </div>
                {/* end orgs select */}
                {/* services, products select */}
                <div className="flex-col input-wrap">
                    <SelectService
                        values={services}
                        setValues={setServices}
                        orgsChoose={formik.values.organizations}
                    />
                </div>
                {/* end orgs select */}
                <div className="flex-row-sp input-wrap">
                    <div className="flex-col wrap-item wrap-item-col-4">
                        <label className="required form-label">Hình thức giảm giá </label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.discount_type}
                            onChange={formik.handleChange}
                            name="discount_type"
                        >
                            {
                                DISCOUNTS_TYPE.map(item => (
                                    <MenuItem key={item.id} value={item.TYPE}>{item.title}</MenuItem>
                                ))
                            }
                        </Select>
                        {formik.errors.discount_type && formik.touched.discount_type && (
                            <span className='text-danger'>
                                {formik.errors.discount_type}
                            </span>
                        )}
                    </div>
                    <div className="flex-col wrap-item wrap-item-col-4">
                        <label className="required form-label">Giảm giá theo</label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.discount_unit}
                            onChange={(e) => {
                                formik.setFieldValue("discount_value", "")
                                formik.setFieldValue("discount_unit", e.target.value)
                            }}
                            name="discount_unit"
                        >
                            {
                                DISCOUNT_UNIT_ARR.map(item => (
                                    <MenuItem key={item.id} value={item.TYPE}>{item.title}</MenuItem>
                                ))
                            }
                        </Select>
                        {formik.errors.discount_unit && formik.touched.discount_unit && (
                            <span className='text-danger'>
                                {formik.errors.discount_unit}
                            </span>
                        )}
                    </div>
                    <div className="wrap-item wrap-item-col-4">
                        <label className="required form-label">
                            {
                                formik.values.discount_type === DISCOUNT_TYPE.FINAL_PRICE ?
                                    "Giảm giá còn"
                                    :
                                    "Giá trị giảm giá"
                            }
                            {formik.values.discount_unit === DISCOUNT_UNIT.PERCENT && "(%)"}
                            {formik.values.discount_unit === DISCOUNT_UNIT.PRICE && "(VNĐ)"}
                        </label>
                        <input
                            onChange={onChangeInputDiscountValue}
                            value={formik.values.discount_value}
                            name="discount_value"
                            type="text"
                            className="form-control form-control-solid"
                            placeholder={
                                formik.values.discount_unit === DISCOUNT_UNIT.PRICE ?
                                    `Giá trị giảm tối đa ${formatPrice(
                                        formik.values.discount_type === DISCOUNT_TYPE.SUB_TOTAL ?
                                            totalServicesPrice : minPriceItem
                                    )}đ`
                                    :
                                    "Giảm giá"
                            }
                        />
                        {formik.errors.discount_value && formik.touched.discount_value && (
                            <span className='text-danger'>
                                {formik.errors.discount_value}
                            </span>
                        )}
                    </div>
                </div>
                <div className='flex-row-sp input-wrap'>
                    <div className="wrap-item wrap-item-col-4">
                        <label className="form-label">
                            Giá trị đơn hàng tối thiểu
                        </label>
                        <input
                            onChange={onChangeMinimumOrderValue}
                            value={formik.values.minimum_order_value}
                            name="minimum_order_value"
                            disabled={formik.values.discount_type === DISCOUNT_TYPE.PRODUCTS ? true : false}
                            type="text"
                            className="form-control form-control-solid"
                            placeholder="Giá áp dụng"
                        />
                    </div>
                </div>
                <div className="flex-row-sp input-wrap">
                    <div className="wrap-item wrap-item-col-4">
                        <label className={`${isCampaign ? 'required' : ''} form-label`}>Số lượng</label>
                        <input
                            value={formik.values.total}
                            onChange={onChangeInputTotal}
                            name="total"
                            type="text"
                            className="form-control form-control-solid"
                            placeholder=""
                        />
                        {formik.errors.total && formik.touched.total && (
                            <span className='text-danger'>
                                {formik.errors.total}
                            </span>
                        )}
                    </div>
                    <div className="wrap-item wrap-item-col-4">
                        <label className="form-label">Lượt sử dụng mỗi khách hàng </label>
                        <input
                            value={formik.values.limit}
                            onChange={onChangeInputLimit}
                            name="limit"
                            type="number"
                            className="form-control form-control-solid"
                            placeholder=""
                        />
                    </div>
                    <div className="wrap-item wrap-item-col-4">
                        <XDateRangePicker
                            minDate={new Date()}
                            startDate={new Date(formik.values.valid_from)}
                            endDate={new Date(formik.values.valid_util)}
                            onChange={(e) => {
                                formik.setFieldValue('valid_from', moment(e.selection.startDate).format('YYYY-MM-DD HH:mm:ss'))
                                formik.setFieldValue('valid_util', moment(e.selection.endDate).format('YYYY-MM-DD HH:mm:ss'))
                            }}
                        />
                    </div>
                </div>
                <div className="input-form__bot">
                    {/* {
                        isForm === "EDIT" &&
                        <button
                            onClick={onRestoreFormEdit}
                            className="btn btn-light"
                            type='button'
                        >
                            Khôi phục
                        </button>
                    } */}
                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        variant='contained'
                        size="large"
                        color="success"
                    >
                        Lưu thay đổi
                    </LoadingButton>
                    {
                        (discount && (discount.platform === PLAT_FORM.SHOPEE || discount.platform === PLAT_FORM.VINID)) &&
                        <ExportCode discount={discount} />
                    }
                </div>
            </form>
        </>
    );
}

export default Form;