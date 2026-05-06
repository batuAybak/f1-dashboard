import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Login from '../../auth/Login'

const mockNavigate = vi.fn()
const mockLogin = vi.fn()

vi.mock('react-router', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => mockNavigate
}))

vi.mock('../../auth/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin
  })
}))

vi.mock('../../components/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    oppositeTheme: 'dark'
  })
}))

describe('Login', () => {
  beforeEach(() => {
    mockLogin.mockReset()
    mockNavigate.mockReset()
  })

  it('submits credentials and navigates on success', async () => {
    mockLogin.mockResolvedValue(undefined)

    render(<Login />)

    fireEvent.change(screen.getByPlaceholderText('Enter username'), {
      target: { value: 'lewis' }
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'secret123' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ username: 'lewis', password: 'secret123' })
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('shows an error message when login fails', async () => {
    mockLogin.mockRejectedValue(new Error('Bad credentials'))

    render(<Login />)

    fireEvent.change(screen.getByPlaceholderText('Enter username'), {
      target: { value: 'lewis' }
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrong-password' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(screen.getByText('Bad credentials')).toBeInTheDocument()
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })
})
