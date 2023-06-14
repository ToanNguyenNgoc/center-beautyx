import React from 'react';
import { IOrganization } from "../../app/interface/organization";
import './style.scss';
import { DIRECT_ORG } from '../../app/util/directToBeauty';

interface IProps {
    org: IOrganization
}

function OrgCard(props: IProps) {
    const { org } = props;
    return (
        <div
            onClick={() => DIRECT_ORG(org)}
            className='org-card'
        >
            <img src={org?.image_url} alt="" className="org-card__img" />
            <div className="card-org__detail">
                <span className="name">{org?.name}</span>
                <span className="address">{org?.full_address}</span>
                <div className="contact">
                    <span className="title">Thông tin liên hệ</span>
                    <ul>
                        {
                            org.telephone?.map((i: string) => (
                                <li key={i} >
                                    {i}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default OrgCard;