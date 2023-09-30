import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('bookstore', () => {
  render(<App />)
  const linkElement = screen.getByText(/bookstore/i)
  expect(linkElement).toBeInTheDocument()
})
