/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from "react"
import "./style.scss"
import { Chip, CircularProgress } from "@mui/material"
import { IOrganization, IService } from "app/interface"
import orgApi from "app/api/orgApi"
import { debounce } from "lodash"
import { formatPrice, onErrorImg } from "app/util"

interface SelectServiceProps {
  orgsChoose?: IOrganization[],
  values: IService[],
  setValues: (values: any) => void
}

export const SelectService = ({ orgsChoose = [], values = [], setValues }: SelectServiceProps) => {
  const refBox = useRef<HTMLDivElement | null>(null)
  const selected_id = values.map(i => i.id)
  const [services, setServices] = useState<{ data: any[], load: boolean }>({ data: [], load: false })
  const onTriggerBox = (type: 'show' | 'hide') => {
    if (orgsChoose.length > 0) {
      if (type === 'show') return refBox.current?.classList?.add('box-services-show')
    }
    if (type === 'hide') return refBox.current?.classList?.remove('box-services-show')
  }
  window.addEventListener('click', () => onTriggerBox('hide'))
  //
  const getServicesByOrgs = async (keyword: string, orgsChoose: any) => {
    let servicesSearch = [];
    for (var org of orgsChoose) {
      const res = await orgApi.getServicesByOrg({
        keyword: keyword,
        org_id: org?.id,
      })
      const newValues = {
        services: res?.data.context.data,
        org: org
      }
      servicesSearch.push(newValues)
    }
    setServices({ data: servicesSearch, load: false })
  }
  const debounceDropDownServices = useCallback(
    debounce((nextValue, orgsChoose) => {
      setServices({ data: [], load: true })
      getServicesByOrgs(nextValue, orgsChoose);
    }, 1500),
    []
  );
  const onChangeSearchServicesProducts = (e: any) => {
    if (orgsChoose && orgsChoose.length > 0) {
      debounceDropDownServices(e.target.value, orgsChoose)
    }
  }
  const list = services.data?.map(i => i.services).flat() ?? []
  const onSelect = (item: IService) => {
    setValues((prev: any) => {
      const index = prev.findIndex((i: any) => i.id === item.id)
      if (index < 0) {
        prev = [...prev, item]
        return prev
      } else {
        return prev.filter((i: any) => i.id !== item.id)
      }
    })
  }
  return (
    <div className="select-services">
      <label className="required form-label">Sản phẩm, Dịch vụ được áp dụng</label>
      <div onClick={(e) => { e.stopPropagation(); onTriggerBox('show') }} className="form-control form-control-solid ser-selected">
        {
          values.map(item => (
            <Chip
              key={item.id}
              label={`${item.service_name} | Giá gốc: ${formatPrice(item.price)}`}
              onDelete={() => setValues((prev: any) => prev.filter((i: any) => i.id !== item.id))}
              size="medium"
              color="primary"
            />
          ))
        }
      </div>
      <div onClick={(e) => e.stopPropagation()} ref={refBox} className="box-services">
        <div className="box-service-input">
          {services.load && <CircularProgress size={16} />}
          <input onChange={onChangeSearchServicesProducts} type="text"
            className="form-control form-control-solid" placeholder="Tìm kiếm dịch vụ..."
          />
        </div>
        <div className="services-list">
          <ul>
            {
              list.filter(Boolean).map((item: IService, index: number) => (
                <li key={index}>
                  <div style={selected_id.includes(item.id) ? { backgroundColor: 'var(--kt-gray-200)' } : {}}
                    onClick={() => onSelect(item)} className="service-item"
                  >
                    <div className="image">
                      <img src={item.image_url} onError={(e) => onErrorImg(e)} alt="" />
                    </div>
                    <div className="service-detail">
                      <p className="service-name">{item.service_name}</p>
                      <p className="service-price">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}