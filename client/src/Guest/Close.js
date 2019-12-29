import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Component/Logo/Logo'

const Close = () => {
  return (
    <div className='home close'>
      <div className='logo'>
        <Logo />
      </div>
      <div className='layout'>
        <div className='title'>
          <h2>Survey</h2>
          <h1>アンケート</h1>
        </div>
        <div className='main'>
          <p>いただいたご意見は今後の参考にさせていただきます。</p>
          <p>ご協力ありがとうございました。</p>
        </div>
        <p><a href='https://winds-n.com' className='link'><div><div class='text'>ホームへ</div><div class='link-arrow'><i class="fas fa-chevron-right"></i></div></div></a></p>
        <p><Link to='/home' className='back-to-home'>もう一度アンケートに答える</Link></p>
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

export default Close