import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import { IntlProvider } from 'react-intl'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { theme } from './theme'
import { Navigation } from './navigation'
import { messages } from './messages'
import { PathsProvider, TransactionsProvider } from './contexts'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <IntlProvider
      locale={navigator.language}
      messages={messages[navigator.language.split(/[-_]/)[0]] || messages.pt}
    >
      <SnackbarProvider
        preventDuplicate
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <TransactionsProvider>
          <Router>
            <PathsProvider>
              <Navigation />
            </PathsProvider>
          </Router>
        </TransactionsProvider>
      </SnackbarProvider>
    </IntlProvider>
  </ThemeProvider>,
  document.getElementById('root'),
)

if (process.env.NODE_ENV === 'production') serviceWorker.register()
else serviceWorker.unregister()
