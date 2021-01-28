import { useCallback } from 'react'
import { useSnackbar } from 'notistack'
import { useIntl } from 'react-intl'

export const useTryCallback = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { formatMessage } = useIntl()

  const tryCallback = useCallback(
    async (callback, errorMessageId) => {
      closeSnackbar()
      try {
        await callback()
      } catch {
        enqueueSnackbar(formatMessage({ id: errorMessageId }), {
          variant: 'error',
        })
      }
    },
    [closeSnackbar, enqueueSnackbar, formatMessage],
  )

  return tryCallback
}
