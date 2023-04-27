import { useState, MouseEvent } from 'react'

import Shelf, { ShelfCoordinates } from '../models/Shelf'
import Handle from './Handle'
import ShapeMenu from './ShapeMenu'

type ShapeProps = {
  instance: Shelf,
  onChange: () => void,
  onRemove: (shelf: Shelf) => void
}

export default function Shape({ instance, onChange, onRemove }: ShapeProps) {
  const [editing, setEditing] = useState(false)
  const { color } = instance

  const pointsAsString = instance.coordinates.map(point => `${point.x},${point.y}`).join(' ')

  const clickHandler = (event: MouseEvent<SVGPolygonElement>) => {
    setEditing(!editing)
    console.log('click')
    event.stopPropagation()
  }

  const handleChangeHandler = (updateFn: (coordinates: ShelfCoordinates) => void, coordinates: ShelfCoordinates) => {
    updateFn(coordinates)
    onChange()
  }

  const handleChangeEndHandler = () => {
    setEditing(false)
  }

  const handleDelete = (event: MouseEvent<SVGTextElement>) => {
    event.preventDefault()
    event.stopPropagation()

    onRemove(instance)
  }

  return (
    <g>
      <polygon
        data-testid='shape'
        onPointerDown={clickHandler}
        points={pointsAsString}
        fill={color}
        fillOpacity='0.5'
        stroke={editing ? 'white' : color}
        strokeWidth='5'
        strokeDasharray={8}
      />
      {editing &&
        <>
          <Handle
            onChange={handleChangeHandler.bind(null, instance.updateTopLeft.bind(instance))}
            onChangeEnd={handleChangeEndHandler}
            coordinates={instance.coordinates[0]}
            color={color}
          />
          <Handle
            onChange={handleChangeHandler.bind(null, instance.updateTopRight.bind(instance))}
            onChangeEnd={handleChangeEndHandler}
            coordinates={instance.coordinates[1]}
            color={color}
          />
          <Handle
            onChange={handleChangeHandler.bind(null, instance.updateBottomRight.bind(instance))}
            onChangeEnd={handleChangeEndHandler}
            coordinates={instance.coordinates[2]}
            color={color}
          />
          <Handle
            onChange={handleChangeHandler.bind(null, instance.updateBottomLeft.bind(instance))}
            onChangeEnd={handleChangeEndHandler}
            coordinates={instance.coordinates[3]}
            color={color}
          />
          <ShapeMenu instance={instance} width={33}>
            <text
              data-testid='remove-button'
              onMouseDown={handleDelete}
              style={{fontSize: '30px'}}
              x={0}
              y={36}
              cursor='pointer'>❌</text>
          </ShapeMenu>
        </>
      }
    </g>
  )
}
