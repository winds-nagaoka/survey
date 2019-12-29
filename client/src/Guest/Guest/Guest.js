import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import request from 'superagent'
import Logo from '../../Component/Logo/Logo'
import * as q from '../../Component/Library/Guest.js'
import * as lib from '../../Component/Library/Library'

import Question1 from './Question1'
import Question2 from './Question2'
import Question3 from './Question3'
import Question4 from './Question4'
import Question5 from './Question5'
import Question6 from './Question6'
import Question7 from './Question7'
import Question8 from './Question8'
import Question9 from './Question9'
import Question10 from './Question10'
import Question11 from './Question11'

import './Guest.css'

const Guest = ({ mode, redirect }) => {
  const defaultAnswer = localStorage.getItem('answer') ? JSON.parse(localStorage.getItem('answer')) : {
  // const defaultAnswer = {
    a1: {
      value: 'false',
      text: ''
    },
    a2: {
      value: 'false'
    },
    a3: {
      age: 'false',
      occupation: 'false',
      text: ''
    },
    a4: {
      value1: 'false',
      value2: 'false',
      text: ''
    },
    a5: {
      value: 'false',
      text1: '',
      text2: '',
      check: false
    },
    a6: {
      check: {
        member: false,
        poster: false,
        paper: false,
        letter: false,
        website: false,
        sns: false,
        other: false,
      },
      text: ''
    },
    a7: {
      text1: '',
      text2: ''
    },
    a8: {
      text: ''
    },
    a9: {
      text: ''
    },
    a10: {
      text1: '',
      text2: ''
    },
    a11: {
      name: '',
      zipcode: '',
      address: ''
    }
  }
  const [ answer, setAnswer ] = useState(defaultAnswer)
  // const [ mode, setMode ] = useState(0)
  const [ fontSize, setFontSize ] = useState(' small')

  useEffect(() => {
    setFontSize(localStorage.getItem('fontsize') ? localStorage.getItem('fontsize') : ' small')
  }, [])

  const updateAnswer = (newAnswer) => {
    localStorage.setItem('answer', JSON.stringify(newAnswer))
    setAnswer(newAnswer)
  }

  const updateFontSize = (newFontSize) => {
    localStorage.setItem('fontsize', newFontSize)
    setFontSize(newFontSize)
  }

  const sendAnswer = () => {
    request.get('https://winds-n.com/ip')
      .then((res) => {
        const ip = res.text
        request.post('/api/post/guest')
          .type('form')
          .send({
            answer,
            time: lib.unixTimeFull(),
            ip,
            userAgent: navigator.userAgent
          })
          .end((err, res) => {
            redirect()
          })
    })
  }

  const showButton = () => {
    if (mode === 0) {
      return (
        <div className='buttons'>
          <Link to='/check' className={'primary' + fontSize} onTouchStart={() => {}}><span>確認</span></Link>
        </div>
      )
    } else {
      return (
        <div className='buttons'>
          <Link to='/guest' className={fontSize} onTouchStart={() => {}}><span>修正する</span></Link>
          <button className={'button primary' + fontSize} onClick={() => sendAnswer()}><span>送信</span></button>
        </div>
      )
    }
  }
  const showMessage = () => {
    if (mode === 0) {
      return (
        <div className={'message' + fontSize}>
          <p>アンケートに回答をお願いいたします。</p>
          <p>必須項目はございません。</p>
        </div>
      )
    } else {
      return (
        <div className={'message' + fontSize}>
          <p>内容を確認後送信ボタンを押してください。</p>
        </div>
      )
    }
  }
  const showPolicyMessage = () => {
    if (mode !== 0) {
      return (
        <div className={'message' + fontSize}>
          <p><a href='https://winds-n.com/policy' target='_blank'>プライバシーポリシー</a>を確認の上、送信してください。</p>
        </div>
      )
    }
  }
  return (
    <div className='guest'>
      <div className='frame'>
        <div className='logo'><Logo /></div>
        <div className='font-size'>
          <span>文字サイズ</span>
          <div className={'small' + (fontSize === ' small' ? ' active' : '')} onClick={() => updateFontSize(' small')}>小</div>
          <div className={'medium' + (fontSize === ' medium' ? ' active' : '')} onClick={() => updateFontSize(' medium')}>中</div>
          <div className={'large' + (fontSize === ' large' ? ' active' : '')} onClick={() => updateFontSize(' large')}>大</div>
        </div>
        {showMessage()}
        <Question1
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question2
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question3
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question4
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question5
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question6
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question7
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question8
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question9
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question10
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        <Question11
          question={q}
          answer={answer}
          mode={mode}
          updateAnswer={updateAnswer}
          fontSize={fontSize}
        />
        {showPolicyMessage()}
        {showButton()}
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

export default Guest