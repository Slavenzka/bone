import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from 'Pages/Home/Home'

export const HOME_PAGE = '/'

export const pageLinks = [
  {
    label: 'Transactions history',
  },
  {
    label: 'Buy Crypto',
    url: 'http://ditex.app'
  },
]

// TODO apply async import of page components to split the initial js chunk
const Routes = () => {
  return (
    <Switch>
      <Route exact path={HOME_PAGE} component={Home} />
    </Switch>
  )
}

export default Routes
