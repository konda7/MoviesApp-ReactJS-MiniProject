import './index.css'

import AccountDetailsContext from '../../context/AccountDetailsContext'

import Header from '../Header'
import Footer from '../Footer'

const Account = props => (
  <AccountDetailsContext.Consumer>
    {value => {
      const {username, password, triggerLogout} = value

      console.log(username, password)

      const onClickLogoutBtn = () => {
        triggerLogout(props)
      }

      return (
        <div className="account-app-container">
          <Header />
          <div className="account-details-container">
            <h1 className="account-heading">Account</h1>
            <hr className="horizontal-line" />
            <div className="details-container">
              <p className="details-heading">Member ship</p>
              <div className="account-details-content-container">
                <p className="mail-plan-content">{`${username}@gmail.com`}</p>
                <p className="password-details">{`Password : ${'*'.repeat(
                  password.length,
                )}`}</p>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="details-container">
              <p className="details-heading">Plan details</p>
              <div className="plan-content-container">
                <p className="mail-plan-content">Premium</p>
                <p className="mail-plan-content ultra-hd">Ultra HD</p>
              </div>
            </div>
            <hr />
            <div className="logout-btn-container">
              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogoutBtn}
              >
                Logout
              </button>
            </div>
          </div>
          <Footer />
        </div>
      )
    }}
  </AccountDetailsContext.Consumer>
)

export default Account
