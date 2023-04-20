import { useFela } from 'react-fela'

export default function App() {
  const { css } = useFela()

  return (
    <div className={css({ color: 'red' })}>Hello</div>
  )
}

