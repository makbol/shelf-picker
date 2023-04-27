import { useState, PointerEvent } from 'react'

import { ShelfCoordinates } from '../models/Shelf'

type HandleProps = {
  coordinates: ShelfCoordinates,
  color: string,
  onChange: (coordinates: ShelfCoordinates) => void,
  onChangeEnd: () => void
}
export default function Handle({ coordinates, color, onChange, onChangeEnd }: HandleProps) {
  const [isDragging, setIsDragging] = useState(false)

  const initMove = (event: PointerEvent) => {
    setIsDragging(true)
    event.stopPropagation()
  }

  const move = (event: PointerEvent) => {
    if(isDragging) {
      onChange({
        x: event.clientX,
        y: event.clientY
      })
    }
    event.stopPropagation()
  }

  const stopMove = (event: PointerEvent) => {
    if(isDragging) {
      setIsDragging(false)
      onChangeEnd()
      event.stopPropagation()
    }
  }

  return (
    <g
      role='button'
      onPointerDown={initMove}
      onPointerMove={move}
      onPointerUp={stopMove}
      onPointerLeave={stopMove}
    >
      <circle
        cx={coordinates.x}
        cy={coordinates.y}
        r={50}
        fill='transparent'
      />
      <circle
        cx={coordinates.x}
        cy={coordinates.y}
        r={10}
        fill={color}
      />
    </g>
  )
}
