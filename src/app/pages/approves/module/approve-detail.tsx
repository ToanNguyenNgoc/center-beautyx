import React, { useRef, useState } from 'react'
import { Dialog } from '@mui/material'
import { IApprove } from 'app/interface'
import { approveApi } from 'app/api'
import style from './style.module.scss'
import { useSwr, useNoti, useGetParamUrl } from 'app/hooks'
import { API_ROUTE } from 'app/api/api-route'
import { paramApproves } from 'app/query-params'
import { onErrorImg } from 'app/util'
import dayjs from 'dayjs'
import {
    ApproveTypeElement,
    ApproveStatusElement,
    APPROVE_STATUS
} from 'app/util/fileType'
import { XButton, SnackAlert, TextArea } from 'components'

interface ApproveDetailProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    approve: IApprove
}

function ApproveDetail(props: ApproveDetailProps) {
    const { open, setOpen, approve } = props;
    const query = useGetParamUrl()
    const [body, setBody] = useState<any>({
        log: "",
        status: approve.status
    })
    const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
    const [refetch, setRefetch] = useState(false)
    useSwr(refetch && open, API_ROUTE.APPROVES, {
        ...paramApproves,
        "page": query?.page ?? 1
    })
    const handlePutApprove = async () => {
        firstLoad()
        try {
            await approveApi.putApprove(approve.id, body)
            setRefetch(true)
            resultLoad("Đã lưu thay đổi")
        } catch (error) {
            resultLoad("Có lỗi xảy ra")
        }
    }
    const onClose = () => {
        setRefetch(false)
        setOpen(false)
    }
    //UI
    const refStatus = useRef<any>()
    const onToggleListStatus = () => {
        refStatus.current?.classList?.toggle(style.approve_list_show)
    }
    const onChangeStatus = (status: string) => setBody({ ...body, status: status })
    const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody({ ...body, log: e.target.value })
    }
    //disable button
    let disable = false
    if (approve.status === "APPROVED" || approve.status === "REJECT") disable = true

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <SnackAlert
                    title={noti.message}
                    open={noti.openAlert}
                    onClose={onCloseNoti}
                />
                <div className={style.container}>
                    <div className={style.header}>
                        <span className={style.header_title}>
                            Chi tiết kiểm duyệt
                        </span>
                        <span className={style.header_created}>
                            Ngày tạo:
                            {dayjs(approve.created_at).format("HH:mm DD/MM/YYYY")}
                        </span>
                    </div>
                    {
                        approve.organization &&
                        <div className={style.body}>
                            <div className={style.body_head_cnt}>
                                <div className={style.body_org}>
                                    <div className={style.body_org_img}>
                                        <img
                                            onError={(e) => onErrorImg(e)}
                                            src={approve.organization.image_url} alt=""
                                        />
                                    </div>
                                    <div className={style.body_org_detail}>
                                        <p title='Xem gian hàng' className={style.org_name}>
                                            {approve.organization.name}
                                        </p>
                                        <p className={style.org_address}>
                                            {approve.organization.full_address}
                                        </p>
                                        <div className={style.org_contact}>
                                            <p className={style.org_contact_title}>
                                                Thông tin liên lạc
                                            </p>
                                            <div className={style.org_contact_list}>
                                                {approve.organization.telephone?.map(item => (
                                                    <p key={item} className={style.org_contact_item}>{item}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.body_approve_detail}>
                                    <div className={style.body_approve_section}>
                                        <p className={style.body_approve_title}>
                                            Kiểm duyệt cho
                                        </p>
                                        <ApproveTypeElement type={approve.type} />
                                    </div>
                                    <div className={style.body_approve_section}>
                                        <p className={style.body_approve_title}>
                                            Trạng thái
                                        </p>
                                        <ApproveStatusElement status={body.status} />
                                        <button
                                            style={disable ? {
                                                cursor: "not-allowed"
                                            } : {}}
                                            disabled={disable}
                                            onFocus={onToggleListStatus}
                                            onBlur={onToggleListStatus}
                                            className={style.body_approve_btn}
                                        >
                                            <i className="bi bi-pencil-fill fs-5"></i>
                                            <ul ref={refStatus} className={style.approve_list}>
                                                {
                                                    APPROVE_STATUS.map(item => (
                                                        <li
                                                            onClick={() => onChangeStatus(item.STATUS)}
                                                            key={item.STATUS} className={style.approve_list_item}
                                                        >
                                                            <ApproveStatusElement status={item.STATUS} />
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={style.body_log_cnt}>
                        <div className={style.body_log_left}>
                            <span className={style.body_approve_title}>Ghi chú</span>
                            <ul className={style.approve_logs}>
                                {
                                    approve.logs?.map(log => (
                                        <li key={log.id} className={style.approve_logs_item}>
                                            <div className={style.log_item}>
                                                {log.note}
                                            </div>
                                            <span className={style.log_item_date}>
                                                {dayjs(log.created_at).format("HH:mm DD/MM/YYYY")}
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={style.body_log_right}>
                            <span className={style.body_approve_title}>Viết ghi chú</span>
                            <TextArea
                                onChange={onChangeInput}
                                placeholder='Viết ghi chú...'
                            />
                        </div>
                    </div>
                    <div className={style.approve_bot}>
                        <XButton
                            onClick={handlePutApprove}
                            title="Lưu thay đổi"
                            color="success"
                            loading={noti.load}
                            disable={disable}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default ApproveDetail