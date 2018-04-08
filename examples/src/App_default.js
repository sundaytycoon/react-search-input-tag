import React, { Fragment } from 'react'

import { Route, Switch, BrowserRouter } from 'react-router-dom'

import MainPage from 'components/pages/MainPage'


const App = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  </Fragment>
)

export default App
