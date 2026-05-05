import { renderHook, act, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import useMutation from '../../api/useMutation'

const mockRequest = vi.fn()
const mockInvalidateTags = vi.fn()

vi.mock('../../api/ApiContext', () => ({
  useApi: () => ({
    request: mockRequest,
    invalidateTags: mockInvalidateTags
  })
}))

describe('useMutation', () => {
  beforeEach(() => {
    mockRequest.mockReset()
    mockInvalidateTags.mockReset()
  })

  it('returns true and invalidates tags on success', async () => {
    mockRequest.mockResolvedValue({ id: 7, title: 'Race recap' })

    const { result } = renderHook(() => useMutation('POST', '/forum', ['forum', 'profile']))

    let didSucceed = false
    await act(async () => {
      didSucceed = await result.current.mutate({ title: 'Race recap' })
    })

    expect(didSucceed).toBe(true)
    expect(mockRequest).toHaveBeenCalledWith('/forum', {
      method: 'POST',
      body: JSON.stringify({ title: 'Race recap' })
    })
    expect(mockInvalidateTags).toHaveBeenCalledWith(['forum', 'profile'])

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.data).toEqual({ id: 7, title: 'Race recap' })
    })
  })

  it('returns false and stores error on failure', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockRequest.mockRejectedValue(new Error('Mutation failed'))

    const { result } = renderHook(() => useMutation('POST', '/forum', ['forum']))

    let didSucceed = true
    await act(async () => {
      didSucceed = await result.current.mutate({ title: 'Broken' })
    })

    expect(didSucceed).toBe(false)
    expect(mockInvalidateTags).not.toHaveBeenCalled()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('Mutation failed')
    })

    errorSpy.mockRestore()
  })
})
