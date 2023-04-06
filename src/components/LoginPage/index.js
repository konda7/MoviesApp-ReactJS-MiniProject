import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import AccountDetailsContext from '../../context/AccountDetailsContext'

class LoginForm extends Component {
  state = {
    errorMsg: '',
  }

  render() {
    return (
      <AccountDetailsContext.Consumer>
        {value => {
          const {
            username,
            password,
            triggerChangeUsername,
            triggerChangePassword,
          } = value

          const onSuccessfulLogin = jwtToken => {
            const {history} = this.props
            history.replace('/')

            console.log(jwtToken)
            Cookies.set('jwt_token', jwtToken, {expires: 30})
          }

          const submitForm = async event => {
            event.preventDefault()

            const apiUrl = 'https://apis.ccbp.in/login'

            const userDetails = {username, password}
            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails),
            }

            const response = await fetch(apiUrl, options)
            const data = await response.json()

            if (response.ok) {
              onSuccessfulLogin(data.jwt_token)
            } else {
              this.setState({errorMsg: data.error_msg})
            }
          }

          const onChangeUsernameInput = event => {
            triggerChangeUsername(event)
          }

          const renderUsernameInput = () => (
            <div className="input-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input"
                placeholder="Username"
                value={username}
                onChange={onChangeUsernameInput}
              />
            </div>
          )

          const onChangePasswordInput = event => {
            triggerChangePassword(event)
          }

          const renderPasswordInput = () => (
            <div className="input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={onChangePasswordInput}
              />
            </div>
          )

          const {errorMsg} = this.state

          const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }

          return (
            <div className="login-form-container">
              <img
                src="https://res.cloudinary.com/dvhrrtgpt/image/upload/v1680325755/Group_7399_n3xfyf.png"
                alt="login website logo"
                className="movies-logo-image"
              />
              <div className="form-content-container">
                <form className="form-container" onSubmit={submitForm}>
                  <h1 className="login-heading">Login</h1>
                  {renderUsernameInput()}
                  {renderPasswordInput()}
                  {errorMsg && <p className="login-error-msg">{errorMsg}</p>}
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                </form>
              </div>
            </div>
          )
        }}
      </AccountDetailsContext.Consumer>
    )
  }
}

export default LoginForm
