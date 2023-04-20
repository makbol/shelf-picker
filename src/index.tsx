import { StrictMode } from 'react'
import { createRenderer } from 'fela'
import ReactDOM from 'react-dom/client'
import { RendererProvider } from 'react-fela'

import App from './App'

const renderer = createRenderer()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StrictMode>
    <RendererProvider renderer={renderer}>
      <App />
    </RendererProvider>
  </StrictMode>
)
