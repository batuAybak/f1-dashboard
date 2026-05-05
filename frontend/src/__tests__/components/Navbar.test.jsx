import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const mockNavigate = vi.fn()
const mockLogout = vi.fn()
const mockToggleTheme = vi.fn()

vi.mock('react-router', () => ({
  NavLink: ({ to, children, onClick }) => (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  ),
  useNavigate: () => mockNavigate
}))

vi.mock('../../auth/AuthContext', () => ({
  useAuth: vi.fn()
}))

vi.mock('../../components/ThemeContext', () => ({
  useTheme: vi.fn()
}))

import { useAuth } from '../../auth/AuthContext'
import { useTheme } from '../../components/ThemeContext'
import Navbar from '../../components/layout/Navbar'

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useTheme.mockReturnValue({ toggleTheme: mockToggleTheme, theme: 'light' })
  })

  it('shows Log in link when user is not authenticated', () => {
    useAuth.mockReturnValue({ token: null, logout: mockLogout })
    render(<Navbar />)

    expect(screen.getByText('Log in')).toBeInTheDocument()
    expect(screen.queryByText('Log out')).not.toBeInTheDocument()
    expect(screen.queryByText('Forum')).not.toBeInTheDocument()
    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
  })

  it('shows Forum, Profile and Log out when user is authenticated', () => {
    useAuth.mockReturnValue({ token: 'abc123', logout: mockLogout })
    render(<Navbar />)

    expect(screen.getByText('Forum')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Log out')).toBeInTheDocument()
    expect(screen.queryByText('Log in')).not.toBeInTheDocument()
  })

  it('always shows core nav links', () => {
    useAuth.mockReturnValue({ token: null, logout: mockLogout })
    render(<Navbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Drivers')).toBeInTheDocument()
    expect(screen.getByText('Teams')).toBeInTheDocument()
    expect(screen.getByText('Standings')).toBeInTheDocument()
    expect(screen.getByText('Calendar')).toBeInTheDocument()
  })

  it('calls logout and navigates to / when Log out is clicked', () => {
    useAuth.mockReturnValue({ token: 'abc123', logout: mockLogout })
    render(<Navbar />)

    fireEvent.click(screen.getByText('Log out'))

    expect(mockLogout).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('toggles the mobile menu open and closed when hamburger is clicked', () => {
    useAuth.mockReturnValue({ token: null, logout: mockLogout })
    const { container } = render(<Navbar />)

    const nav = container.querySelector('.navigation')
    expect(nav.className).not.toContain('open')

    fireEvent.click(container.querySelector('.hamburger'))
    expect(nav.className).toContain('open')

    fireEvent.click(container.querySelector('.hamburger'))
    expect(nav.className).not.toContain('open')
  })

  it('calls toggleTheme when theme button is clicked', () => {
    useAuth.mockReturnValue({ token: null, logout: mockLogout })
    render(<Navbar />)

    fireEvent.click(screen.getByLabelText('Toggle light/dark mode'))
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })
})
