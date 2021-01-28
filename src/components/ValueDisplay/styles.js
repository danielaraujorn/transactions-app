import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    margin: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
  },
  label: {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '24px',
  },
  value: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '32px',
  },
}))
