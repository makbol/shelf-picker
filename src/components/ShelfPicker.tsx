import { useFela } from 'react-fela'
import { useState, PointerEvent } from 'react'

import Shape from './Shape'
import ImageLoader from './ImageLoader'
import Shelf from '../models/Shelf'

type ShelfPickerProps = {
  imageUrl: string,
  shelves: Shelf[],
  onAdd: (shelf: Shelf) => void,
  onRemove: (shelf: Shelf) => void
}
export default function ShelfPicker({ imageUrl, shelves, onAdd, onRemove }: ShelfPickerProps) {
  const { css } = useFela()
  const [object, setObject] = useState<Shelf>()
  const [isDragging, setIsDragging] = useState(false)
  const [, setTimestamp] = useState(0)

  const initDrawing = (event: PointerEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setIsDragging(true)

    setObject(new Shelf({
      startingPoint: {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }))
  }

  const draw = (event: PointerEvent) => {
    if (isDragging && object) {
      const rect = event.currentTarget.getBoundingClientRect()

      object.update({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      })

      setTimestamp(Date.now())
    }
  }

  const stopDrawing = () => {
    if(isDragging && object && !object.isEmpty()) {
      onAdd(object)
    }
    setObject(undefined)
    setIsDragging(false)
  }

  return (
    <div
      data-testid='canvas'
      onPointerDown={initDrawing}
      onPointerMove={draw}
      onPointerUp={stopDrawing}
      onPointerLeave={stopDrawing}
      className={css( { touchAction: 'none' })}
    >
      <ImageLoader imageUrl={imageUrl}>
        <svg height='100%' width='100%'>
          {isDragging && object &&
            <Shape instance={object} onChange={() => {}} onRemove={() => {}} />
          }
          {shelves.map(shelf =>
            <Shape
              key={shelf.id}
              instance={shelf}
              onChange={() => { setTimestamp(Date.now()) }}
              onRemove={onRemove}
            />
          )}
        </svg>
      </ImageLoader>
    </div>
  )
}
