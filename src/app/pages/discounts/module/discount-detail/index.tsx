/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import "./style.scss";
import { useSwr, useVerifyRoute } from 'app/hooks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IDiscountPar } from 'app/interface/discounts';
import { extraServicesDiscount } from 'app/util/extraProductable';
import TitlePage from 'components/TitlePage';
import { formatDate, formatPrice } from 'app/util/format';
import FlatFormOrder from 'components/PlatForm';
import { DiscountsTypeElement, DISCOUNT_UNIT } from 'app/util/fileType';
import { IOrganization } from 'app/interface/organization';
import { DIRECT_ORG } from 'app/util/directToBeauty';
import onErrorImg from 'app/util/onErrorImg';
import { IService } from 'app/interface/service';
import ServiceCard from 'components/ServiceCard';
import { API_ROUTE } from 'app/api/api-route';

function DiscountDetail() {
    const { METHOD } = useVerifyRoute()
    const params: any = useParams()
    const navigate = useNavigate();
    let condition = false
    if (params.id && METHOD?.includes('GET_BY_ID')) condition = true
    const { response, error } = useSwr(condition, API_ROUTE.DISCOUNTS_ID(params.id))
    useEffect(() => { if (error) return navigate("/error/404") }, [error])
    const discount: IDiscountPar = response
    const servicesDiscount = extraServicesDiscount(discount);

    return (
        discount ?
            <>
                <TitlePage
                    title={discount?.title}
                    element={
                        METHOD?.includes("UPDATE") ?
                            <Link
                                to={{
                                    pathname: "/pages/discount-form",
                                    search: `id=${discount.id}`
                                }}
                                className="btn btn-sm btn-success">Thay đổi thông tin
                            </Link>
                            :
                            <></>
                    }
                />
                <div className="card card-custom">
                    <div className="flex-row-sp card-detail-head">
                        <div className="left">
                            <div className="left-item">
                                <span className='left-item__title'>Mã giảm giá:</span>
                                <span className="badge badge-light-danger">{discount.coupon_code}</span>
                            </div>
                            <div className="left-item">
                                <span className="left-item__title">
                                    Thời gian áp dụng:
                                </span>
                                <span className="date-ex">
                                    {formatDate(discount.valid_from)}-{formatDate(discount.valid_util)}
                                </span>
                            </div>
                        </div>
                        <div className="right">
                            <FlatFormOrder platForm={discount.platform ? discount.platform : ""} />
                        </div>
                    </div>
                    <div className="card-detail-apply">
                        <div className="card-detail-apply__item">
                            <span className="title"> Giảm
                                {discount?.discount_unit === DISCOUNT_UNIT.PERCENT ? '(%)' : '(VNĐ)'}
                                : </span>
                            <span className="value">{formatPrice(discount?.discount_value)}</span>
                        </div>
                        <div className="card-detail-apply__item">
                            <span className="title">
                                Hình thức giảm giá:
                            </span>
                            <DiscountsTypeElement
                                TYPE={discount.discount_type}
                            />
                        </div>
                        <div className="card-detail-apply__item">
                            <span className="title"> Giá trị đơn hàng tối thiểu: </span>
                            <span className="value">{
                                discount?.minimum_order_value || "Không ràng buộc"
                            }</span>
                        </div>
                        <div className="card-detail-apply__item">
                            <span className="title"> Số lượng: </span>
                            <span className="value">{
                                discount?.total || "Không giới hạn"
                            }</span>
                        </div>
                        <div className="card-detail-apply__item">
                            <span className="title">
                                {discount?.limit ?
                                    `Giới hạn ${discount?.limit} lần sử dụng mỗi khách hàng`
                                    :
                                    `Không giới hạn số lần sử dụng mỗi khách hàng`}
                            </span>
                        </div>
                        <div className="card-detail-apply__item">
                            <span className="title">
                                Mô tả:
                            </span>
                            <span className="value">{discount?.description}</span>
                        </div>
                    </div>
                    <div className="card-org-list">
                        <span className="title">
                            Doanh nghiệp được áp dụng
                        </span>
                        <ul className="list">
                            {
                                discount?.organizations?.map((org: IOrganization, index: number) => (
                                    <li key={index} className="list-item">
                                        <div
                                            onClick={() => DIRECT_ORG(org)}
                                            className="flex-col-al org-item-card"
                                        >
                                            <img src={org?.image_url}
                                                alt=""
                                                className="org-avatar"
                                                onError={(e) => onErrorImg(e)}
                                            />
                                            <span className="org-name">
                                                {org?.name}
                                            </span>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="card-org-list">
                        <span className="title">
                            Sản phẩm/ Dịch vụ đc áp dụng
                        </span>
                        <ul className="list">
                            {
                                servicesDiscount?.map((service: IService, index: number) => (
                                    <li key={index} className="list-item">
                                        <ServiceCard
                                            service={service}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </>
            :
            <></>
    );
}

export default DiscountDetail;