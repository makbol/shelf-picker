import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import ShelfPicker from './ShelfPicker'
import Shelf from '../models/Shelf'

import productsImage from '../assets/products.jpg'
import TestWrapper from '../testing/TestWrapper'

describe('@components/ShelfPicker', () => {
  it('renders', () => {
    render(
      <ShelfPicker
        shelves={[]}
        imageUrl={productsImage}
        onAdd={() => {}}
        onRemove={() => {}} />,
      { wrapper: TestWrapper }
    )
  })

  it('should not create shape when clicked but not moved', async () => {
    const addSpy = jest.fn()
    const removeSpy = jest.fn()
    const user = userEvent.setup()

    render(
      <ShelfPicker
        shelves={[]}
        imageUrl={productsImage}
        onAdd={addSpy}
        onRemove={removeSpy} />,
      { wrapper: TestWrapper }
    )
    const canvas = screen.getByTestId('canvas')

    await user.pointer({keys: '[MouseLeft]', target: canvas})

    expect(addSpy).not.toHaveBeenCalled()
  })

  it('calls onAdd when shape was drawn', async () => {
    const addSpy = jest.fn()
    const user = userEvent.setup()

    render(
      <ShelfPicker
        shelves={[]}
        imageUrl={productsImage}
        onAdd={addSpy}
        onRemove={() => {}} />,
      { wrapper: TestWrapper }
    )
    const canvas = screen.getByTestId('canvas')

    await user.pointer([
      { keys: '[MouseLeft>]', target: canvas, coords: {x: 10, y: 10}},
      { target: canvas, coords: {x: 15, y: 15}}
    ])
    expect(screen.getByTestId('shape')).toBeInTheDocument()

    await user.pointer({keys: '[/MouseLeft]', target: canvas})
    expect(addSpy).toHaveBeenCalled()
  })

  it('call onRemove when shape was removed', async () => {
    const addSpy = jest.fn()
    const removeSpy = jest.fn()
    const user = userEvent.setup()

    const shelf = new Shelf({ startingPoint: { x: 10, y: 10 }})
    shelf.update({ x: 20, y: 20 })

    render(
      <ShelfPicker
        shelves={[shelf]}
        imageUrl={productsImage}
        onAdd={addSpy}
        onRemove={removeSpy} />,
      { wrapper: TestWrapper }
    )

    expect(addSpy).not.toHaveBeenCalled()

    await user.click(screen.getByTestId('shape'))
    await user.click(screen.getByTestId('remove-button'))

    expect(removeSpy).toHaveBeenCalled()
  })

})
