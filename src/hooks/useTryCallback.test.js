import '@testing-library/jest-dom/extend-expect'
import { renderHook, act } from '@testing-library/react-hooks'
import { useTryCallback } from './useTryCallback'

const mockCloseSnackbar = jest.fn()
const mockEnqueueSnackbar = jest.fn()

jest.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: mockEnqueueSnackbar,
    closeSnackbar: mockCloseSnackbar,
  }),
}))

const errorMessage = { id: 'errorMessage' }

const mockFormatMessage = jest.fn().mockReturnValue('default message')

jest.mock('react-intl', () => ({
  useIntl: () => ({
    formatMessage: mockFormatMessage,
  }),
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('useTryCallback', () => {
  it('should not render snackbar when callback works', async () => {
    const { result } = renderHook(() => useTryCallback())
    expect(mockCloseSnackbar).not.toHaveBeenCalled()
    await act(async () => {
      const tryCallback = result.current
      await tryCallback(
        () => new Promise((resolve) => resolve()),
        errorMessage.id,
      )
    })
    expect(mockEnqueueSnackbar).not.toHaveBeenCalled()
    expect(mockFormatMessage).not.toHaveBeenCalled()
    expect(mockCloseSnackbar).toHaveBeenCalledTimes(1)
  })

  it('should render snackbar when callback fails', async () => {
    const { result } = renderHook(() => useTryCallback())
    expect(mockEnqueueSnackbar).not.toHaveBeenCalled()
    expect(mockFormatMessage).not.toHaveBeenCalled()
    await act(async () => {
      const tryCallback = result.current
      await tryCallback(
        () => new Promise((_, reject) => reject()),
        errorMessage.id,
      )
    })
    expect(mockFormatMessage).toHaveBeenCalledTimes(1)
    expect(mockFormatMessage).toHaveBeenCalledWith(errorMessage)
    expect(mockEnqueueSnackbar).toHaveBeenCalledTimes(1)
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('default message', {
      variant: 'error',
    })
  })
})
