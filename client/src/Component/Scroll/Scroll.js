import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const Scroll = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children || null
}

export default withRouter(Scroll)