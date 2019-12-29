import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Component/Logo/Logo'

import './Home.css'

const Home = () => {
  useEffect(() => {
    localStorage.clear()
  }, [])
  return (
    <div className='home'>
      <div className='logo'>
        <Logo />
      </div>
      <div className='layout'>
        <div className='title'>
          <h2>Survey</h2>
          <h1>アンケート</h1>
        </div>
        <p>本日はご来場いただき、誠にありがとうございます。</p>
        <p>アンケートへのご協力をお願いいたします。</p>
        <div className='link-button'>
          <Link to='/guest' className='button' onTouchStart={() => {}}><span>アンケートを開く</span></Link>
        </div>
      </div>
      <footer>
        <div>
          <div className='author'>
            <Logo />
            <small>&copy; The Wind Ensemble 1985-{new Date().getFullYear()} All Rights Reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home