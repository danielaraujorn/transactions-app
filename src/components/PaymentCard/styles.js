import { makeStyles } from '@material-ui/core/styles'

const DEFAULT_TEXT_STYLE = {
  fontSize: 16,
  lineHeight: '24px',
}

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(),
    borderBottom: theme.border,
    borderTop: theme.border,
  },
  row: {
    margin: theme.spacing(),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    ...DEFAULT_TEXT_STYLE,
    color: theme.palette.typography.main,
    fontWeight: 700,
    textTransform: 'lowercase',
    '&:first-line': {
      textTransform: 'capitalize',
    },
  },
  status: {
    ...DEFAULT_TEXT_STYLE,
    color: theme.palette.typography.light,
    fontSize: 14,
  },
  date: {
    ...DEFAULT_TEXT_STYLE,
    color: theme.palette.typography.main,
  },
  amount: {
    ...DEFAULT_TEXT_STYLE,
    fontWeight: 700,
    color: theme.palette.typography.dark,
  },
}))
