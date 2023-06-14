import { Drawer } from '@mui/material';
import React, { useState } from 'react'
import { ICONS } from '_metronic/assets/icons/icons';
import style from './setup.module.scss';
import dataLayout, { IDataLayout } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { onAddNewSection, onFocusSection } from 'app/redux/setup-home';
import { IRoot } from 'app/redux/interface';
import { SectionBanners } from './components';
import { RightBanner } from './components-right'

function SetupHome() {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(1);
    const { sectionFocus } = useSelector((state: IRoot) => state.HOME_SETUP)
    return (
        <>
            <Nav open={open} setOpen={setOpen} />
            <div className={style.container}>
                <div className={style.head}>
                    <div className={style.head_left}>
                        <button onClick={() => setTab(1)}
                            className={tab === 1 ? "btn btn-primary" : "btn btn-secondary"}>Điện thoại</button>
                        <button onClick={() => setTab(2)}
                            className={tab === 2 ? "btn btn-primary" : "btn btn-secondary"}>Máy tính</button>
                    </div>
                    <button className="btn btn-success">Lưu thay đổi</button>
                </div>
                <div className={style.body}>
                    <div className={style.body_left}>
                        {tab === 1 && <MobileContainer setOpen={setOpen} />}
                        {tab === 2 && <DesktopContainer setOpen={setOpen} />}
                    </div>
                    <div className={style.body_right}>
                        {sectionFocus?.layout_for === "BANNERS" && <RightBanner />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SetupHome;

interface MobileContainerProps {
    setOpen: (open: boolean) => void
}
export const MobileContainer = (props: MobileContainerProps) => {
    const { sections } = useSelector((state: IRoot) => state.HOME_SETUP)
    const { setOpen } = props
    const sectionBanners = sections.filter((i: IDataLayout) => i.layout_for === "BANNERS")
    return (
        <div className={style.mobile_container}>
            <div className={style.mobile_head}>
                <img src={ICONS.headMobile} alt="" />
            </div>
            {
                sectionBanners.length > 0 &&
                sectionBanners.map((item: IDataLayout, index: number) => (
                    <SectionBanners key={index} sectionBanner={item} />
                ))
            }


            <ButtonAddSection onClick={() => setOpen(true)} />
        </div>
    )
}

interface DesktopContainerProps {
    setOpen: (open: boolean) => void
}
export const DesktopContainer = (props: DesktopContainerProps) => {
    const { setOpen } = props;
    return (
        <div className={style.desktop_container}>
            <div className={style.desktop_head}>
                <img src={ICONS.headPc} alt="" />
            </div>
            <ButtonAddSection onClick={() => setOpen(true)} />
        </div>
    )
}

interface NavProp {
    open: boolean, setOpen: (open: boolean) => void
}

export const Nav = (props: NavProp) => {
    const dispatch = useDispatch()
    const { open, setOpen } = props
    const handleAddNewSection = (item_layout: IDataLayout) => {
        dispatch(onAddNewSection(item_layout))
        dispatch(onFocusSection(item_layout))
    }
    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            anchor="left"
        >
            <div className={style.nav_container}>
                <div className={style.nav_head}>
                    <span className={style.nav_head_title}>Mẫu thiết kế</span>
                    <img
                        onClick={() => setOpen(false)}
                        className={style.nav_head_img}
                        src="/media/icons/duotune/arrows/arr015.svg" alt="" />
                </div>
                <div className={style.nav_body}>
                    <div className={style.nav_section_item}>
                        <span className={style.nav_section_item_title}>
                            Banners
                        </span>
                        <div className={style.nav_section_body}>
                            {
                                dataLayout
                                    .filter(i => i.layout_for === "BANNERS")
                                    .map(i => (
                                        <ButtonAddLayout
                                            key={i.title}
                                            icon={i.icon}
                                            title={i.title}
                                            onClick={() => handleAddNewSection(i)}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                    <div className={style.nav_section_item}>
                        <span className={style.nav_section_item_title}>
                            Danh mục
                        </span>
                        <div className={style.nav_section_body}>
                            {
                                dataLayout
                                    .filter(i => i.layout_for === "BANNERS")
                                    .map(i => (
                                        <ButtonAddLayout
                                            key={i.title}
                                            icon={i.icon}
                                            title={i.title}
                                        />
                                    ))
                            }
                            {
                                dataLayout
                                    .filter(i => i.layout_for === "BANNERS")
                                    .map(i => (
                                        <ButtonAddLayout
                                            key={i.title}
                                            icon={i.icon}
                                            title={i.title}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                    <div className={style.nav_section_item}>
                        <span className={style.nav_section_item_title}>
                            Giảm giá
                        </span>
                        <div className={style.nav_section_body}>
                            {
                                dataLayout
                                    .filter(i => i.layout_for === "BANNERS")
                                    .map(i => (
                                        <ButtonAddLayout
                                            key={i.title}
                                            icon={i.icon}
                                            title={i.title}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                    <div className={style.nav_section_item}>
                        <span className={style.nav_section_item_title}>
                            Dịch vụ
                        </span>
                        <div className={style.nav_section_body}>
                            {
                                dataLayout
                                    .filter(i => i.layout_for === "BANNERS")
                                    .map(i => (
                                        <ButtonAddLayout
                                            key={i.title}
                                            icon={i.icon}
                                            title={i.title}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export const ButtonAddSection = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            className={style.btn_add}
            onClick={onClick}
        >
            <img src="/media/icons/duotune/arrows/arr013.svg" alt="" />
            <span className={style.btn_add_title}>
                Thêm section
            </span>
        </button>
    )
}
export const ButtonAddLayout = (
    { onClick, icon, title }: { onClick?: () => void, icon: string, title: string }
) => {
    return (
        <div className={style.btn_add_layout_cnt}>
            <button
                className={style.btn_add_layout}
                onClick={onClick}
            >
                <img src={icon} alt="" />
            </button>
            <span>{title}</span>
        </div>
    )
}