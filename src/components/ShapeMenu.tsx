import Shelf from '../models/Shelf'
import { PropsWithChildren } from 'react'

type ShapeMenuProps = PropsWithChildren<{
  instance: Shelf,
  width: number
}>

export default function ShapeMenu({instance, width, children }: ShapeMenuProps) {
  const y = Math.min(instance.coordinates[0].y, instance.coordinates[1].y)
  const svgX = (instance.coordinates[0].x + instance.coordinates[1].x) / 2 - width/2

  const hasEnoughSpace = y > 60

  const svgY = hasEnoughSpace ? y - 60 : y + 20

  return (
    <svg x={svgX} y={svgY}>
      {children}
    </svg>
  )
}
