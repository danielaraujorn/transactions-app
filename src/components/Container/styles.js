import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    maxWidth: 500,
    overflowY: 'auto',
  },
}))
