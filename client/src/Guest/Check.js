import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Guest from './Guest/Guest'

const Check = () => {
  const [redirect, setRedirect] = useState('')
  const updateRedirect = () => {
    setRedirect('/close')
  }
  if (redirect) {
    return <Redirect push to={redirect} />
  }
  return <Guest mode={1} redirect={updateRedirect} />
}

export default Check