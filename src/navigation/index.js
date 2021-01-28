import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { usePaths } from '../hooks'

const Transactions = lazy(() => import(`../screens/Transactions`))
const NewTransaction = lazy(() => import(`../screens/NewTransaction`))

export const Navigation = () => {
  const paths = usePaths()
  return (
    <Switch>
      <Route exact path={paths.transactions}>
        <Suspense fallback={<LinearProgress />}>
          <Transactions />
        </Suspense>
      </Route>
      <Route exact path={paths.newTransaction}>
        <Suspense fallback={<LinearProgress />}>
          <NewTransaction />
        </Suspense>
      </Route>
      <Route path="*">
        <Redirect to={paths.transactions} />
      </Route>
    </Switch>
  )
}
