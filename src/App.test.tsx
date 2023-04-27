import { render } from '@testing-library/react'

import App from './App'
import TestWrapper from './testing/TestWrapper'

test('it renders', () => {
  render(<App />, {wrapper: TestWrapper})
})
