import { useState } from 'react'

import Shelf from '../models/Shelf'

export default function useShelves() {
  const [shelves, setShelves] = useState<Shelf[]>([])

  const addShelf = (shelf: Shelf) => {
    setShelves(state => [...state, shelf])
  }

  const removeShelf = (shelf: Shelf) => {
    const index = shelves.indexOf(shelf)
    setShelves(state => [
      ...state.slice(0, index),
      ...state.slice(index + 1, state.length)
    ])
  }

  return {
    shelves,
    addShelf,
    removeShelf
  }
}
