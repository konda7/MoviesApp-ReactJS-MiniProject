import React from 'react'

const AccountDetailsContext = React.createContext({
  username: '',
  password: '',
  triggerChangeUsername: () => {},
  triggerChangePassword: () => {},
  triggerLogout: () => {},
})

export default AccountDetailsContext
