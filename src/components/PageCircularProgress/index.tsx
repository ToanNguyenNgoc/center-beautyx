import { CSSProperties, FC } from "react"
import './style.scss'
import { CircularProgress } from "@mui/material"

interface PageCircularProgressProps {
  content?: string,
  className?: string,
  style?: CSSProperties,
  loading?: boolean,
}

export const PageCircularProgress: FC<PageCircularProgressProps> = ({
  content = 'Đang tải dữ liệu',
  className = '',
  style = {},
  loading = false
}) => {
  return (
    loading ?
      <div style={style} className={`container-load ${className}`}>
        <p className="">{content}</p>
        <CircularProgress style={{ color: 'var(--beautyx)' }} />
      </div>
      :
      <></>
  )
}