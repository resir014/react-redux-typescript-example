import React from 'react'
import { render } from '@testing-library/react'

function Button({ children }: React.PropsWithChildren<{}>) {
  return <button type="button">{children}</button>
}

test('renders without crashing', () => {
  const { container } = render(<Button>hello</Button>)
  expect(container).toBeInTheDocument()
})
