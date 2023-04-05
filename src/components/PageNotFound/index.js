import './index.css'

import {Link} from 'react-router-dom'

const Account = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Lost Your Way ?</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found <br /> Please go
      back to the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default Account
