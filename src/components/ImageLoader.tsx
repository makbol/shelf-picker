import { useFela } from 'react-fela'
import { PropsWithChildren } from 'react'

import useImageSize from '../hooks/useImageSize'

type ImageLoaderProps = {
  imageUrl: string
}

export default function ImageLoader({ children, imageUrl }: PropsWithChildren<ImageLoaderProps>) {
  const { css } = useFela()
  const { width, height } = useImageSize(imageUrl)

  return (
    <div className={css({
      backgroundImage: `url(${imageUrl})`,
      width:  `${width}px`,
      height: `${height}px`,
    })}>
      {children}
    </div>
  )
}
