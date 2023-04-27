import { useEffect, useState } from 'react'

export default function useImageSize(imageUrl: string) {
  const [dimensions, setDimensions] = useState([0, 0])
  const [height, width] = dimensions

  useEffect(() => {
    if(imageUrl) {
      const img = new Image()

      img.onload = () => {
        setDimensions([img.height, img.width])
      }

      img.src = imageUrl
    }
  }, [imageUrl])

  return {
    height, width
  }
}
