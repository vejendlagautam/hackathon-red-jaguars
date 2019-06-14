import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Login from '../login/Login'
import Landing from '../landing/Landing'
import WatchAuth from '../auth/WatchAuth'

function App() {
  return (
    <Router>
      <WatchAuth>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </WatchAuth>
    </Router>
  )
}

export default App
