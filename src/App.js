import './App.css'

import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginPage'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'
import Search from './components/Search'
import Account from './components/Account'
import PageNotFound from './components/PageNotFound'

import AccountDetailsContext from './context/AccountDetailsContext'

class App extends Component {
  state = {username: '', password: ''}

  triggerChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  triggerChangePassword = event => {
    this.setState({password: event.target.value})
  }

  triggerLogout = props => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
    this.setState({username: '', password: ''})
  }

  render() {
    const {username, password} = this.state

    return (
      <AccountDetailsContext.Provider
        value={{
          username,
          password,
          triggerChangeUsername: this.triggerChangeUsername,
          triggerChangePassword: this.triggerChangePassword,
          triggerLogout: this.triggerLogout,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/account" component={Account} />
          <Route exact path="/not-found" component={PageNotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </AccountDetailsContext.Provider>
    )
  }
}

export default App
