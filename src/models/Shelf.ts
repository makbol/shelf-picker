import randomHex from '../services/randomHex'

export type ShelfCoordinates = {
  x: number,
  y: number
}

export default class Shelf {
  name: string
  color: string
  id: number
  coordinates: [
    ShelfCoordinates,
    ShelfCoordinates,
    ShelfCoordinates,
    ShelfCoordinates
  ]

  constructor({
    name = '',
    color = '#' + randomHex(),
    startingPoint
  }: { startingPoint: ShelfCoordinates, name?: string, color?: string }) {
    this.name = name
    this.color = color
    this.id = Date.now()
    this.coordinates = [startingPoint, startingPoint, startingPoint, startingPoint]
  }

  update(point: ShelfCoordinates) {
    const [startingPoint] = this.coordinates
    this.coordinates = [
      startingPoint,
      { x: point.x, y: startingPoint.y },
      { x: point.x, y: point.y },
      { x: startingPoint.x, y: point.y }
    ]
  }

  updatePoint(index: number, newCoordinates: ShelfCoordinates) {
    this.coordinates[index] = newCoordinates
  }

  updateTopLeft(coordinates: ShelfCoordinates) {
    this.updatePoint(0, coordinates)
  }

  updateTopRight(coordinates: ShelfCoordinates) {
    this.updatePoint(1, coordinates)
  }

  updateBottomRight(coordinates: ShelfCoordinates) {
    this.updatePoint(2, coordinates)
  }

  updateBottomLeft(coordinates: ShelfCoordinates) {
    this.updatePoint(3, coordinates)
  }
  isEmpty() {
    return this.coordinates[0].x === this.coordinates[1].x
  }
}
