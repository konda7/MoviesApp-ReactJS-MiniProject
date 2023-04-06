import React from 'react'

const AccountDetailsContext = React.createContext({
  userDetails: {
    username: '',
    password: '',
  },
  triggerChangeUsername: () => {},
  triggerChangePassword: () => {},
  triggerLogout: () => {},
})

export default AccountDetailsContext
