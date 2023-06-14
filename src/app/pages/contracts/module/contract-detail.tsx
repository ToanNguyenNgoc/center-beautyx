import React, { useState } from 'react';
import TitlePage from 'components/TitlePage';
import { useParams } from 'react-router-dom';
import { API_ROUTE } from 'app/api/api-route';
import { useNoti, useSwr } from 'app/hooks';
import { DIRECT_ORG_E } from 'app/util'
import { IContract, IOrganization } from 'app/interface';
import { Navigate } from 'react-router-dom';
import { ApproveTypeElement, ApproveStatusElement } from 'app/util/fileType'
import { SnackAlert, XButton } from 'components'
import style from './contract-detail.module.scss'
import dayjs from 'dayjs';
import { approveApi } from 'app/api';
import { Dialog } from '@mui/material';
import parse from 'html-react-parser';

const paramsDetail = {
    "include": "approve|organization"
}

function ContractDetail() {
    const params: any = useParams();
    const [open, setOpen] = useState(false)
    const { response, error, mutate } = useSwr(params.id, API_ROUTE.CONTRACTS_BY_ID(params.id), paramsDetail)
    const contract: IContract = response
    const org: IOrganization = useSwr(
        contract?.organization_id,
        API_ROUTE.ORGANIZATIONS_ID(contract?.organization_id)
    ).response
    let branchesRegister: any[] = []
    if (contract?.extra?.ecommerce_branch && org?.branches) {
        branchesRegister = contract?.extra?.ecommerce_branch?.map(brand_id => {
            const branch = org?.branches?.find(i => i.id === parseInt(brand_id))
            return branch
        }).filter(Boolean)
    }
    const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
    const handlePutApprove = async () => {
        firstLoad()
        try {
            await approveApi.putApprove(contract.approve.id, {
                log: "",
                status: "APPROVED"
            })
            // setRefetch(true)
            resultLoad("Đã lưu thay đổi")
        } catch (error) {
            resultLoad("Có lỗi xảy ra")
        }
        mutate({
            ...response,
            approve: { ...response.approve, status: "APPROVED" },
        }, true)
    }
    console.log(contract)
    return (
        <>
            <SnackAlert
                title={noti.message}
                open={noti.openAlert}
                onClose={onCloseNoti}
            />
            <TitlePage
                title={`Chi tiết hợp đồng ${contract?.company_name ?? "..."}`}
                element={
                    <div className={style.title_page}>
                        <XButton
                            title='Xem hợp đồng'
                            onClick={() => setOpen(true)}
                        />
                        <XButton
                            title='Thay đổi thông tin'
                        />
                        <XButton
                            loading={noti.load}
                            color="success"
                            title='Duyệt'
                            onClick={handlePutApprove}
                        />
                    </div>
                }
            />
            {
                contract &&
                <div className={style.container}>
                    <div className={style.head}>
                        <div className={style.head_left}>
                            <div className={style.head_item}>
                                <span className={style.head_item_title}>
                                    Hợp đồng của
                                </span>
                                <ApproveTypeElement type={contract.approve?.type} />
                            </div>
                            <div className={style.head_item}>
                                <span className={style.head_item_title}>
                                    Trạng thái
                                </span>
                                <ApproveStatusElement status={contract.approve?.status} />
                            </div>
                        </div>
                        <div className={style.head_item}>
                            <span className={style.head_item_title}>
                                Ngày tạo:
                            </span>
                            {dayjs(contract.created_at).format("HH:mm DD/MM/YYYY")}
                        </div>
                    </div>
                    <div className={style.contract_table}>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Mã hợp đồng
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.extra?.corporate_tax_code ?? <h6>Trống</h6>}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Gói đăng ký
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.package_name}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Tên doanh nghiệp
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.organization?.name}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Link gian hàng
                            </div>
                            <div className={style.contract_table_item_right}>
                                <span
                                    onClick={() => DIRECT_ORG_E(org?.subdomain)}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >{`https://beautyx.vn/cua-hang/${org?.subdomain}`}</span>
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Chi nhánh đăng ký
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.extra?.ecommerce_branch?.length}
                                {
                                    contract.extra?.ecommerce_branch?.length > 0 &&
                                    <span>
                                        <i className="bi bi-eye fs-4"></i>
                                    </span>
                                }
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Số điện thoại
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.telephone ?? <h6>Trống</h6>}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Địa chỉ doanh nghiệp
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.organization?.full_address}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Người đại diện
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.extra?.accountant_name ?? <h6>Trống</h6>}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Email liên hệ
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.email?.join(', ')}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Địa chỉ công ty
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.address ?? <h6>Trống</h6>}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Mã số thuế
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.extra?.corporate_tax_code ?? <h6>Trống</h6>}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Tên ngân hàng
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.bank_name ?? <h6>Trống</h6>}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Tên chủ thẻ
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.bank_owner_name ?? <h6>Trống</h6>}
                            </div>
                        </div>
                        <div className={style.contract_table_item}>
                            <div className={style.contract_table_item_left}>
                                Số tài khoản
                            </div>
                            <div className={style.contract_table_item_right}>
                                {contract.bank_number ?? <h6>Trống</h6>}
                            </div>
                        </div>
                    </div>
                </div>
            }
            {contract && <ViewContract
                open={open} setOpen={setOpen} contract={contract}
            />}
            {error && <Navigate to="/error/404" />}
        </>
    );
}

export default ContractDetail;

interface ViewContractProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    contract: IContract
}

const ViewContract = (props: ViewContractProps) => {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
        >
            <div
                style={{ width: "800px", height: "1000px" }}
            >
                
            </div>
        </Dialog>
    )
}