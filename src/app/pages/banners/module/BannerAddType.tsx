import React from 'react';
import { ICONS } from '../../../../_metronic/assets/icons/icons';
import { IBanner } from '../../../interface/banner';
import { BANNERS_TYPE, IBannerType } from '../../../util/fileType';
import { onChangeValueBanner } from '../../../redux/banner/bannerSlice'
import { useDispatch } from 'react-redux';


interface IProps {
    typeBannerRef: any,
    onToggleBannerType: () => void,
    bannerDetail: IBanner
}

function BannerAddType(props: IProps) {
    const { typeBannerRef, onToggleBannerType, bannerDetail } = props;
    const dispatch = useDispatch();
    const onChangeBannerType = (type: IBannerType) => {
        typeBannerRef?.current?.classList?.remove("plat-form-act")
        if (type.type !== bannerDetail.type) {
            dispatch(onChangeValueBanner({
                ...bannerDetail,
                type: type.type,
                url: "",
                origin_id: null
            }))
        }
    }

    return (
        <div className="input-form__wrap">
            <label className="form-label">
                <span className="required">
                    Loại Banner cho
                </span>
            </label>
            <div className="form-control form-control-solid">
                <div
                    onClick={onToggleBannerType}
                    className="flex-row-sp plat-form-select"
                >
                    <ul className="flex-row plat-form-select__arr">
                        <li className='item'>
                            {bannerDetail.type === "" ? "Chọn loại Banners" :
                                BANNERS_TYPE.find((i: IBannerType) => i.type === bannerDetail.type)?.title
                            }
                        </li>
                    </ul>
                    <img
                        className='icon'
                        src={ICONS.caretDownBlack} alt=""
                    />
                </div>
                <div
                    ref={typeBannerRef}
                    className="plat-form-list"
                >
                    <ul className="list">
                        {
                            BANNERS_TYPE.map((item: IBannerType) => (
                                <li
                                    style={item.type === bannerDetail.type ?
                                        { backgroundColor: "var(--kt-primary-active)", color: "var(--white)" }
                                        :
                                        {}
                                    }
                                    onClick={() => onChangeBannerType(item)}
                                    key={item.id}
                                >
                                    {item.title}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BannerAddType;