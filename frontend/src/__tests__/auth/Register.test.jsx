import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Register from '../../auth/Register'

const mockNavigate = vi.fn()
const mockRegister = vi.fn()

vi.mock('react-router', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => mockNavigate
}))

vi.mock('../../auth/AuthContext', () => ({
  useAuth: () => ({
    register: mockRegister
  })
}))

vi.mock('../../components/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    oppositeTheme: 'dark'
  })
}))

describe('Register', () => {
  beforeEach(() => {
    mockRegister.mockReset()
    mockNavigate.mockReset()
  })

  it('submits transformed payload and navigates on success', async () => {
    mockRegister.mockResolvedValue(undefined)

    render(<Register />)

    fireEvent.change(screen.getByPlaceholderText('Enter user name'), {
      target: { value: 'lando' }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), {
      target: { value: 'Lando' }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), {
      target: { value: 'Norris' }
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'mclaren' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Register' }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        username: 'lando',
        password: 'mclaren',
        first_name: 'Lando',
        last_name: 'Norris'
      })
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('shows validation error for short password and does not submit', async () => {
    render(<Register />)

    fireEvent.change(screen.getByPlaceholderText('Enter user name'), {
      target: { value: 'newuser' }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), {
      target: { value: 'New' }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), {
      target: { value: 'User' }
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '12345' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Register' }))

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument()
      expect(mockRegister).not.toHaveBeenCalled()
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })
})
