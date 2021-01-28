import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  formInputs: {
    padding: theme.spacing(2),
    marginTop: 'auto',
  },
}))
