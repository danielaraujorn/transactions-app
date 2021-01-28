import { createMuiTheme } from '@material-ui/core/styles'

const borderRadius = 8

const grayScale = {
  dark: '#2B2B2B',
  main: '#454550',
  light: '#72737A',
  superLight: '#F2F2F3',
  white: '#FFFFFF',
}

const primary = {
  main: '#006064',
  contrastText: grayScale.white,
}

const secondary = {
  main: '#F56E1B',
  contrastText: grayScale.white,
}

const border = `1px solid ${grayScale.superLight}`

export const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
    typography: grayScale,
  },
  borderRadius,
  border,
  typography: {
    fontFamily: "'Lato', sans-serif",
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none',
      },
      colorPrimary: {
        color: '#070817',
        backgroundColor: grayScale.superLight,
      },
    },
    MuiButton: {
      sizeLarge: {
        padding: '12px 24px',
      },
      containedSizeLarge: {
        fontSize: 16,
        lineHeight: '24px',
      },
      root: {
        borderRadius,
        textTransform: 'none',
      },
      contained: {
        '&.Mui-disabled': {
          backgroundColor: grayScale.superLight,
          color: grayScale.light,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius,
      },
    },
  },
})
