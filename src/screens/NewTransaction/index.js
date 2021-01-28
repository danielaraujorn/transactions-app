import React from 'react'
import ArrowBack from '@material-ui/icons/ArrowBack'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
} from '@material-ui/core'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { NewTransactionForm } from './NewTransactionForm'
import { Container } from '../../components'
import { usePaths } from '../../hooks'

const NewTransaction = () => {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const paths = usePaths()
  const goToTransactions = () => history.push(paths.transactions)
  return (
    <Container>
      <AppBar position="relative">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <IconButton
                aria-label={formatMessage({ id: 'goBack' })}
                onClick={goToTransactions}
                edge="start"
                color="primary"
              >
                <ArrowBack />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Typography color="primary" align="center">
                {formatMessage({ id: 'newTransaction' })}
              </Typography>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Toolbar>
      </AppBar>
      <NewTransactionForm />
    </Container>
  )
}

export default NewTransaction
