import React from 'react';
import FlatFormOrder from '../../../../components/PlatForm';
import { ICONS } from '../../../../_metronic/assets/icons/icons';
import { IBanner } from '../../../interface/banner';
import { PLAT_FORM_ARR } from '../../../util/platForm';
import { onChangeValueBanner } from '../../../redux/banner/bannerSlice'
import { useDispatch } from 'react-redux';

interface IProps {
    platFormListRef: any,
    onTogglePlatFormList: () => void,
    bannerDetail: IBanner,
}

function BannerAddPlatForm(props: IProps) {
    const { platFormListRef, onTogglePlatFormList, bannerDetail } = props;
    const dispatch = useDispatch();

    const platFormArr = bannerDetail.platform.split("|").filter(Boolean);
    const onChangePlatForm = (item: any) => {
        dispatch(onChangeValueBanner({
            ...bannerDetail,
            platform: platFormArr.includes(item) ?
                platFormArr.filter((i: any) => i !== item).join("|")
                :
                [...platFormArr, item].join("|")
        }))
    }
    const onRemoveItemPlatForm = (item: any) => {
        dispatch(onChangeValueBanner({
            ...bannerDetail,
            platform: platFormArr.filter((i: any) => i !== item).join("|")
        }))
    }
    //toggle list

    return (
        <div className="input-form__wrap flat-form">
            <label className="form-label">
                <span className="required">Nền tảng</span>
            </label>
            <div className="form-control form-control-solid">
                <div className="flex-row-sp plat-form-select">
                    <ul className="flex-row plat-form-select__arr">
                        {platFormArr.length === 0 &&
                            <li className='item'>Tất cả</li>
                        }
                        {
                            platFormArr.map((item: any, index: number) => (
                                <FlatFormOrder
                                    key={index}
                                    platForm={item}
                                    element={
                                        <img
                                            onClick={() => onRemoveItemPlatForm(item)}
                                            src={ICONS.crossCircleBlack} alt=""
                                        />
                                    }
                                />
                            ))
                        }
                    </ul>
                    <img
                        onClick={onTogglePlatFormList}
                        className='icon'
                        src={ICONS.caretDownBlack} alt=""
                    />
                </div>
                <div ref={platFormListRef} className="plat-form-list">
                    <ul className="list">
                        <li
                            // onClick={() => setValues({
                            //     ...values,
                            //     platform: []
                            // })}
                            style={platFormArr.length === 0 ?
                                {
                                    backgroundColor: "var(--bs-success)",
                                    color: "var(--bs-gray-100)"
                                }
                                :
                                {}
                            }
                        >Tất cả</li>
                        {
                            PLAT_FORM_ARR.map((item: any, index: number) => (
                                <li
                                    style={platFormArr.includes(item) ?
                                        {
                                            backgroundColor: "var(--bs-success)",
                                            color: "var(--bs-gray-100)"
                                        }
                                        :
                                        {}
                                    }
                                    onClick={() => onChangePlatForm(item)}
                                    key={index}
                                >
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BannerAddPlatForm;