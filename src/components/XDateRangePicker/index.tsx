import { FC, useRef } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range"
import { vi } from "date-fns/locale"
import moment from "moment";
import { Box } from "@mui/material";
import "./style.scss"

interface XDateRangePickerProps {
  required?: boolean;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  startDate?: Date;
  endDate?: Date;
  onChange?: (e: RangeKeyDict) => void;
  onApply?: () => void;
  onCancel?: () => void;
  showBot?: boolean;
  init?: boolean
}

export const XDateRangePicker: FC<XDateRangePickerProps> = ({
  label = 'Thời gian áp dụng',
  required = false,
  minDate, maxDate,
  startDate = new Date(),
  endDate = new Date(),
  onChange = () => { }, onApply = () => { }, onCancel = () => { }, showBot = false,
  init = false
}) => {
  const refDatePicker = useRef<HTMLDivElement>(null)
  const onToggleDatePicker = (arg: 'show' | 'hide') => {
    if (refDatePicker.current) {
      if (arg === 'show') refDatePicker.current.classList.add('date-picker-act')
      if (arg === 'hide') refDatePicker.current.classList.remove('date-picker-act')
    }
  }
  window.addEventListener('click', () => onToggleDatePicker('hide'))
  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }
  return (
    <div className="range-date-cnt">
      <div className={`${required ? 'required' : ''} form-label`}>{label}</div>
      <div onClick={(e) => e.stopPropagation()} className="date">
        <div onClick={() => onToggleDatePicker('show')} className="date-input d-flex align-items-center justify-content-between">
          <div className="date-input-cnt">
            <div className="form-control form-control-solid mb-4">
              {init ? "--" : moment(startDate).format('DD/MM/YYYY')}
            </div>
          </div>
          -
          <div className="date-input-cnt">
            <div className="form-control form-control-solid mb-4">
              {init ? "---" : moment(endDate).format('DD/MM/YYYY')}
            </div>
          </div>
        </div>
        <Box ref={refDatePicker} sx={{ boxShadow: 3 }} className="date-picker">
          <DateRangePicker
            locale={vi}
            color='#7265AD'
            minDate={minDate}
            maxDate={maxDate}
            ranges={[selectionRange]}
            onChange={onChange}
          />
          {
            showBot &&
            <div className="d-flex justify-content-between py-2 px-4 date-picker_bot">
              <button onClick={() => { onApply(); onToggleDatePicker('hide') }} type="button" className="btn btn-primary">
                Áp dụng
              </button>
              <button onClick={() => { onCancel(); onToggleDatePicker('hide') }} type="button" className="btn btn-light">
                Hủy
              </button>
            </div>
          }
        </Box>
      </div>
    </div>
  )
}