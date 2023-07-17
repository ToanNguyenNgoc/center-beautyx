/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useCallback, useRef } from "react";
import "./org-select-multiple.scss"
import { useMutation } from "react-query";
import { orgApi } from "app/api";
import { ResponseList } from "@types";
import { IOrganization } from "app/interface";
import { debounce } from "lodash";
import { Avatar, Box, Chip, CircularProgress, MenuItem } from "@mui/material";

interface SelectionOrgMultipleProps {
  label?: string,
  origins?: IOrganization[],
  onChangeOrigin?: (origins: IOrganization[]) => void
}

export const SelectionOrgMultiple: FC<SelectionOrgMultipleProps> = (
  { label = 'Gắn doanh nghiệp', origins = [], onChangeOrigin }
) => {
  const refOrgSearch = useRef<HTMLDivElement>(null)
  const onTriggerOrgSearch = (arg: 'hide' | 'show') => {
    if (refOrgSearch.current) {
      if (arg === 'hide') { refOrgSearch.current.classList.remove('org-search-show') }
      if (arg === 'show') { refOrgSearch.current.classList.add('org-search-show') }
    }
  }
  window.addEventListener('click', () => onTriggerOrgSearch('hide'))
  const { data, mutate, isLoading } = useMutation({
    mutationFn: (keyword: string) => orgApi.getAll({ keyword, is_ecommerce: true })
      .then<ResponseList<IOrganization[]>>(res => res.data.context)
  })
  const debounceOrgs = useCallback(
    debounce((keyword) => mutate(keyword), 600),
    []
  );
  const onChangeOrgSearch = (e: ChangeEvent<HTMLInputElement>) => debounceOrgs(e.target.value)
  const onSelectOrigin = (o: IOrganization) => {
    if (onChangeOrigin) {
      const iIndex = origins.findIndex(i => i.id === o.id)
      if (iIndex < 0) {
        onChangeOrigin([...origins, o])
      } else {
        onChangeOrigin(origins.filter(i => i.id !== o.id))
      }
    }
  }
  return (
    <div className="col col-org">
      <label className="required filter-row_label mb-2">{label}</label>
      <div
        onClick={(e) => { e.stopPropagation(); onTriggerOrgSearch('show') }}
        className="form-control form-control-solid"
      >
        {
          origins.length > 0 ?
            origins.map(o => (
              <Chip className="m-1" key={o.id} color='primary'
                label={o.name} avatar={<Avatar alt={o.subdomain} src={o.image_url} />}
                onDelete={() => onSelectOrigin(o)}
              />
            ))
            :
            'Gắn doanh nghiệp'
        }
      </div>
      <Box ref={refOrgSearch} sx={{ boxShadow: 3 }} className="org-search">
        <div onClick={(e) => e.stopPropagation()}>
          <input onChange={onChangeOrgSearch} type="text" className="form-control form-control-solid" placeholder='Tìm kiếm...' />
          {isLoading && <CircularProgress size={16} />}
          <div className="org-list">
            <ul className="list">
              {
                data?.data?.map(item => (
                  <MenuItem
                    selected={origins.map(i => i.id).includes(item.id)}
                    onClick={() => onSelectOrigin(item)} key={item.id} >
                    {item.name}
                  </MenuItem>
                ))
              }
            </ul>
          </div>
        </div>
      </Box>
    </div>
  )
}