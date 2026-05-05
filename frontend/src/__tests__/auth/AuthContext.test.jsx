import { renderHook, act, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AuthProvider, useAuth } from '../../auth/AuthContext'

function wrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

describe('AuthContext', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.restoreAllMocks()
  })

  it('register stores token after successful request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        text: vi.fn().mockResolvedValue('register-token')
      })
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.register({ username: 'new-user', password: 'secret1' })
    })

    await waitFor(() => {
      expect(sessionStorage.getItem('token')).toBe('register-token')
    })
  })

  it('login stores token and userId after successful requests', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          text: vi.fn().mockResolvedValue('login-token')
        })
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue({ user: { id: 44 } })
        })
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login({ username: 'hamilton', password: 'podium' })
    })

    await waitFor(() => {
      expect(sessionStorage.getItem('token')).toBe('login-token')
      expect(sessionStorage.getItem('userId')).toBe('44')
    })
  })

  it('logout clears token in state and session storage', () => {
    sessionStorage.setItem('token', 'persisted-token')

    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      result.current.logout()
    })

    expect(result.current.token).toBeNull()
    expect(sessionStorage.getItem('token')).toBeNull()
  })

  it('throws when useAuth is called outside provider', () => {
    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used within an AuthProvider')
  })
})
