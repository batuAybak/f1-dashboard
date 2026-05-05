import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'

import { ThemeProvider, useTheme } from '../../components/ThemeContext'

function ThemeConsumer() {
  const { theme, oppositeTheme, toggleTheme } = useTheme()

  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <p data-testid="opposite-theme">{oppositeTheme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    document.body.className = ''
  })

  it('uses light theme by default and persists it', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(screen.getByTestId('opposite-theme')).toHaveTextContent('dark')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.body.className).toBe('light')
  })

  it('loads previously saved theme and toggles', () => {
    localStorage.setItem('theme', 'dark')

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(screen.getByTestId('opposite-theme')).toHaveTextContent('light')

    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.body.className).toBe('light')
  })
})
