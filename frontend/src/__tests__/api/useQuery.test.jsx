import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import useQuery from '../../api/useQuery'

const mockRequest = vi.fn()
const mockProvideTag = vi.fn()

vi.mock('../../api/ApiContext', () => ({
  useApi: () => ({
    request: mockRequest,
    provideTag: mockProvideTag
  })
}))

describe('useQuery', () => {
  beforeEach(() => {
    mockRequest.mockReset()
    mockProvideTag.mockReset()
  })

  it('registers the tag and stores data on success', async () => {
    mockRequest.mockResolvedValue([{ id: 1, name: 'Max Verstappen' }])

    const { result } = renderHook(() => useQuery('/drivers', 'drivers'))

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith('/drivers')
    })

    expect(mockProvideTag).toHaveBeenCalledWith('drivers', expect.any(Function))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.data).toEqual([{ id: 1, name: 'Max Verstappen' }])
    })
  })

  it('captures an error message when request fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockRequest.mockRejectedValue(new Error('Network down'))

    const { result } = renderHook(() => useQuery('/drivers', 'drivers'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('Network down')
      expect(result.current.data).toBeUndefined()
    })

    errorSpy.mockRestore()
  })
})
