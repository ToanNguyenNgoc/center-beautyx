import React from 'react'
import {IService} from '../../app/interface/service'
import './style.scss'
import onErrorImg from '../../app/util/onErrorImg'
import {formatPrice} from '../../app/util/format'

interface IProps {
  service: IService
}

function ServiceCard(props: IProps) {
  const {service} = props
  return (
    <div className='service-item'>
      <img
        src={service?.image_url || service?.org?.image_url}
        alt=''
        className='item-img'
        onError={(e) => onErrorImg(e)}
      />
      <div className='detail'>
        <span className='name'>{service?.service_name}</span>
        <div className='flex-col price'>
          <span className='sale'>{formatPrice(service?.price)}Đ</span>
          <span className='old'>
            {(service?.special_price > 0 || service?.special_price_momo > 0) &&
              formatPrice(service?.price)}
          </span>
        </div>
        {service?.org && (
          <div className='flex-row-al org'>
            <img src={service?.org?.image_url} alt='' className='org-avatar' />
            <span className='org-name'>{service.org?.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceCard
