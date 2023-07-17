import { productableApi } from "app/api";
import { ChangeEvent, FC, useCallback, useRef } from "react";
import { useMutation } from "react-query";
import "./style.scss"
import { debounce, identity, pickBy } from "lodash";
import { Productable } from "app/interface";
import { Avatar, Box, Chip, CircularProgress, MenuItem } from "@mui/material";

interface SelectionProductableProps {
  label?: string,
  required?: boolean,
  productable?: Productable[],
  onChangeProductable?: (productable: Productable[]) => void
}

export const SelectionProductable: FC<SelectionProductableProps> = ({
  label = 'Gắn dịch vụ',
  required = false,
  productable = [],
  onChangeProductable
}) => {
  // const [productable, setProductable] = useState<Productable[]>([])
  const refOrgSearch = useRef<HTMLDivElement>(null)
  const onTriggerOrgSearch = (arg: 'hide' | 'show') => {
    if (refOrgSearch.current) {
      if (arg === 'hide') { refOrgSearch.current.classList.remove('org-search-show') }
      if (arg === 'show') { refOrgSearch.current.classList.add('org-search-show') }
    }
  }
  window.addEventListener('click', () => onTriggerOrgSearch('hide'))
  const { mutate, isLoading, data } = useMutation({
    mutationFn: (keyword: string) => productableApi.getAll(pickBy({
      keyword,
      'on_ecommerce': true,
      'type': 1,
    }, identity))
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOrgs = useCallback(
    debounce((keyword) => mutate(keyword), 600),
    []
  );
  const onChangeOrgSearch = (e: ChangeEvent<HTMLInputElement>) => debounceOrgs(e.target.value)
  const onSelectProductable = (item: Productable) => {
    if (onChangeProductable) {
      const iIndex = productable.findIndex(i => i.id === item.id)
      if (iIndex < 0) {
        onChangeProductable([...productable, item])
      } else {
        onChangeProductable(productable.filter(i => i.id !== item.id))
      }
    }
  }
  return (
    <div className="col col-org">
      <label className={`${required ? 'required' : ''} form-label`}>
        {label} ({productable.length} dịch vụ)
      </label>
      <div
        onClick={(e) => { e.stopPropagation(); onTriggerOrgSearch('show') }}
        className="form-control form-control-solid"
      >
        {
          productable.length > 0 ?
            productable.map(o => (
              <Chip className="m-1" key={o.id} color='success'
                label={o.name} avatar={<Avatar alt={o.name}
                  src={o.name}
                />}
                onDelete={() => onSelectProductable(o)}
              />
            ))
            :
            'Gắn dịch vụ'
        }
      </div>
      <Box ref={refOrgSearch} sx={{ boxShadow: 3 }} className="org-search">
        <div onClick={(e) => e.stopPropagation()}>
          <input onChange={onChangeOrgSearch} type="text" className="form-control form-control-solid"
            placeholder='Tìm kiếm dịch vụ...'
          />
          {isLoading && <CircularProgress size={16} />}
          <div className="org-list">
            <ul className="list">
              {
                data?.data?.map(item => (
                  <MenuItem
                    selected={productable.map(i => i.id).includes(item.id)}
                    onClick={() => onSelectProductable(item)} key={item.id}
                  >
                    <Avatar style={{ marginRight: '6px' }} alt={item.name}
                      src={item.organization[0] && item.organization[0]?.image_url}
                    />
                    <div className="col" >
                      <p>{item.name}</p>
                      <p className="org-name">{item.organization[0]?.name}</p>
                    </div>
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