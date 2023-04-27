import { createRenderer } from 'fela'
import { PropsWithChildren } from 'react'
import { RendererProvider } from 'react-fela'

const renderer = createRenderer()
export default function TestWrapper({ children }: PropsWithChildren<{}>) {
  return <RendererProvider renderer={renderer}>{children}</RendererProvider>
}
