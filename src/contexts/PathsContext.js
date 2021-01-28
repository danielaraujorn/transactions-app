import React, { createContext } from 'react'
import PropTypes from 'prop-types'

const PATHS = {
  transactions: '/',
  newTransaction: '/new',
}

export const PathsContext = createContext(PATHS)

export const PathsProvider = ({ children }) => {
  return <PathsContext.Provider value={PATHS}>{children}</PathsContext.Provider>
}

PathsProvider.propTypes = {
  children: PropTypes.element,
}
