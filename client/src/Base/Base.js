import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Base = () => {

  const [redirect, setRedirect] = useState('')

  useEffect(() => {
    setRedirect('/home')
  }, [])

  if (redirect) {
    return (
      <Redirect to={redirect} />
    )
  } else {
    return (
      <React.Fragment></React.Fragment>
    )
  }
}

export default Base