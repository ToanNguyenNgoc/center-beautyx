import style from './avatar.module.scss'
import {onErrorImg} from 'app/util'

interface AvatarPros {
  src: string
  borderRadius?: 100 | 8 | 6
  className?: string
  size?: number
}

export function Avatar(props: AvatarPros) {
  const {className, borderRadius, src, size} = props
  const _class = className ?? ''
  return (
    <div
      style={{borderRadius: borderRadius ?? 6, width: size ?? 54, height: size ?? 54}}
      className={`${style.container} ${_class}`}
    >
      <img
        style={{borderRadius: borderRadius ?? 6}}
        src={src}
        className={style.avatar_img}
        alt=''
        onError={(e) => onErrorImg(e)}
      />
    </div>
  )
}
