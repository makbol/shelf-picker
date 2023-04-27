import useShelves from './hooks/useShelves'

import ShelfPicker from './components/ShelfPicker'

import productsImage from './assets/products.jpg'

export default function App() {
  const { shelves, addShelf, removeShelf } = useShelves()

  return (
    <div>
      <ShelfPicker
        imageUrl={productsImage}
        shelves={shelves}
        onAdd={addShelf}
        onRemove={removeShelf}
      />
    </div>
  )
}

