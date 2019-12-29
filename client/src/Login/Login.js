import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import request from 'superagent'

import { Actions } from '../Component/Flux/Actions'

import Toast from '../Component/Toast/Toast'
import * as lib from '../Component/Library/Library'
import Horn from '../Component/Logo/Horn'
import Logo from '../Component/Logo/Logo'

import './Login.css'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pass: '',
      sending: true,
      redirect: '',
      errorMessage: ''
    }
  }

  componentWillMount () {
    window.localStorage.status === 'member' ? this.setState({redirect: '/32ndconcert/survey'}) : ''
  }

  login (e) {
    e.preventDefault()
    if (this.state.pass === '') {
      this.setState({errorMessage: 'パスワードを入力してください'})
      return
    }
    this.setState({sending: false})
    request.post('/api/login')
      .type('form')
      .send({
        passwd: this.state.pass
      })
      .end((err, res) => {
        if (err) {
          this.setState({sending: true, errorMessage: '接続できませんでした'})
          return
        }
        const response = res.body
        if (response.status) {
          window.localStorage['status'] = 'member'
          window.scrollTo(0, 0)
          this.setState({sending: true, redirect: '/32ndconcert/survey'})
          // 処理順によって表示できない
          Actions.toastShow('ログインしました')
          return
        }
        this.setState({sending: true, errorMessage: 'ログインできませんでした'})
      })
  }

  keyPress (e) {
    if (e.which === 13) this.login(e)
  }

  errorMessageShow () {
    if (this.state.errorMessage) {
      return (
        <div className='error-message'>
          {this.state.errorMessage}
        </div>
      )
    }
  }

  render () {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    const changed = (name, e) => this.setState({[name]: e.target.value})
    const errorMessage = this.errorMessageShow()
    const disable = this.state.sending ? false : true
    const buttonText = this.state.sending ? 'ログイン' : <i className="fas fa-spinner fa-pulse"></i>
    return (
      <div className='base'>
        <Toast />
        <div className='header'>
          <div><span className='svg'><Logo /></span></div>
          <Horn />
          <div><span className='main-title'>アンケート</span></div>
        </div>
        <div className='login'>
          <div className='form'>
            <form>
              <label htmlFor='login-pass-input'>ログインパスワード</label>
              <input type='password' id='login-pass-input' value={this.state.pass} onChange={(e) => changed('pass', e)} onKeyPress={(e) => this.keyPress(e)} placeholder='パスワード' autoComplete='off' />
              {errorMessage}
              <button onClick={(e) => this.login(e)} onTouchStart={() => {}} disabled={disable}>{buttonText}</button>
            </form>
          </div>
        </div>
        <div className='footer'><span>&copy; </span><span className='name'>{lib.getYear()} The Wind Ensemble</span></div>
      </div>
    )
  }
}