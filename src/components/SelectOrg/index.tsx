/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useRef } from "react";
import './org-select.scss'
import { IOrganization } from "app/interface";
import { orgApi } from "app/api";
import { ResponseDetail, ResponseList } from "@types";
import { useMutation, useQuery } from "react-query";
import { debounce } from "lodash";
import { Avatar, Box, Chip, CircularProgress, MenuItem } from "@mui/material";

interface OrgSelectProps {
  required?: boolean
  organization_id: number | string | undefined | null
  origin: IOrganization | undefined
  setOrigin: Dispatch<SetStateAction<IOrganization | undefined>>
}
export const SelectionOrg: FC<OrgSelectProps> = ({ origin, setOrigin, organization_id, required }) => {
  useQuery({
    queryKey: ['ORG_SELECTION', organization_id],
    queryFn: () => orgApi.getOrgById(organization_id).then<ResponseDetail<IOrganization>>(res => res.data),
    enabled: (organization_id) ? true : false,
    onSuccess: (data) => setOrigin(data.context),
  })
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
  return (
    <div className="col col-org">
      <label className={`${required && 'required'} filter-row_label mb-2`}>Gắn doanh nghiệp</label>
      <div
        onClick={(e) => { e.stopPropagation(); onTriggerOrgSearch('show') }}
        className="form-control form-control-solid"
      >
        {
          origin ?
            <Chip avatar={<Avatar src={origin.image_url} alt={origin.subdomain} />} color='success'
              label={origin.name} onDelete={() => setOrigin(undefined)}
            />
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
                  <MenuItem onClick={() => setOrigin(item)} key={item.id} >{item.name}</MenuItem>
                ))
              }
            </ul>
          </div>
        </div>
      </Box>
    </div>
  )
}