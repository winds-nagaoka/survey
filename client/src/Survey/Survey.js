import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import request from 'superagent'

import { Actions } from '../Component/Flux/Actions'

import { confirmAlert } from 'react-confirm-alert'

import Toast from '../Component/Toast/Toast'
import * as lib from '../Component/Library/Library'
import * as q from '../Component/Library/Question'
import Horn from '../Component/Logo/Horn'
import Logo from '../Component/Logo/Logo'

import './Survey.css'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sending: true,
      redirect: '',

      mode: 'input',

      fontSize: 'small',

      text101: window.localStorage.text101 ? window.localStorage.text101 : '',
      text102: window.localStorage.text102 ? window.localStorage.text102 : '',
      text201: window.localStorage.text201 ? window.localStorage.text201 : '',
      text202: window.localStorage.text202 ? window.localStorage.text202 : '',
      text203: window.localStorage.text203 ? window.localStorage.text203 : '',
      text301: window.localStorage.text301 ? window.localStorage.text301 : '',
      text401: window.localStorage.text401 ? window.localStorage.text401 : '',
      text402: window.localStorage.text402 ? window.localStorage.text402 : '',

    }
  }

  componentWillMount () {
    window.localStorage.status === 'member' ? '' : this.setState({redirect: '/32ndconcert'})
  }

  sendMessage (e) {
    e.preventDefault()
    this.setState({sending: false})
    request.get('https://winds-n.com/ip')
      .then((res) => {
        const ip = res.text

        request.post('/api/post')
        .type('form')
        .send({
          message: {
            text101: this.state.text101,
            text102: this.state.text102,
            text201: this.state.text201,
            text202: this.state.text202,
            text203: this.state.text203,
            text301: this.state.text301,
            text401: this.state.text401,
            text402: this.state.text402
          },
          ip,
          userAgent: navigator.userAgent
        })
        .end((err, res) => {
          if (err) {
            this.setState({sending: true, errorMessage: '接続できませんでした'})
            return
          }
          const response = res.body
          if (response.status) {
            window.localStorage.clear()
            // Actions.toastShow('リセットしました')
            window.localStorage['status'] = 'member'
            this.setState({
              text101: '',
              text102: '',
              text201: '',
              text202: '',
              text203: '',
              text301: '',
              text401: '',
              text402: '',
              sending: true,
              mode: 'sent'
            })
            return
          }
          this.setState({sending: true})
        })
      })

  }

  reset (e) {
    e.preventDefault()
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='alert'>
            <h1>リセットしますか？</h1>
            <p>入力したすべてのデータが消えます</p>
            <div className='button-group'>
              <button onClick={onClose}>キャンセル</button>
              <button onClick={() => {
                window.localStorage.clear()
                // Actions.toastShow('リセットしました')
                window.localStorage['status'] = 'member'
                onClose()
                this.setState({
                  text101: '',
                  text102: '',
                  text201: '',
                  text202: '',
                  text203: '',
                  text301: '',
                  text401: '',
                  text402: '',
                })
              }}>リセット</button>
            </div>
          </div>
        )
      }
    })
  }

  logout (e) {
    e.preventDefault()
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='alert'>
            <h1>ログアウトしますか？</h1>
            <p>入力したすべてのデータが消えます</p>
            <div className='button-group'>
              <button onClick={onClose}>キャンセル</button>
              <button onClick={() => {
                window.localStorage.clear()
                // Actions.toastShow('リセットしました')
                onClose()
                this.setState({redirect: '/32ndconcert'})
              }}>ログアウト</button>
            </div>
          </div>
        )
      }
    })
  }

  changeCheckMode (e) {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.setState({mode: 'check'})
  }

  changeInputMode (e) {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.setState({mode: 'input'})
  }

  textChange (name, e) {
    window.localStorage[name] = e.target.value
    this.setState({[name]: e.target.value})
  }

  renderSent () {
    return (
      <div className={'survey ' + this.state.fontSize}>
        <Toast />

        <div className='buttons'>
          <button onClick={(e) => this.logout(e)} onTouchStart={() => {}} className='reset-button'>ログアウト</button>
        </div>

        <div className='header'>
          <div><span className='svg'><Logo /></span></div>
          {/* <Horn /> */}
          <div><span className='main-title'>アンケート</span></div>
        </div>

        <div className='sizechange'>
          <label>文字サイズ</label>
          <span onClick={() => this.setState({fontSize: 'small'})} className={this.state.fontSize === 'small' ? 'on' : ''}>小</span>
          <span onClick={() => this.setState({fontSize: 'medium'})} className={this.state.fontSize === 'medium' ? 'on' : ''}>中</span>
          <span onClick={() => this.setState({fontSize: 'large'})} className={this.state.fontSize === 'large' ? 'on' : ''}>大</span>
        </div>
        <div className='header-text'>
          <p>ありがとうございました。</p>
        </div>
        <div className='form'>
          <form>
            <button onClick={(e) => this.changeInputMode(e)} onTouchStart={() => {}}>もどる</button>
          </form>
        </div>
      </div>
    )
  }

  editText(text) {
    const regExp = /(https?:\/\/\S+|\n)/;
    const brExp = /\n/
    return text.split(regExp).map(function (line,i) {
        return line.match(brExp) ? (<br key={i} />) : line
    })
  }

  renderCheck () {
    const disable = this.state.sending ? false : true
    const buttonText = this.state.sending ? '送信' : '送信しています...'

    return (
      <div className={'survey ' + this.state.fontSize}>
        <Toast />

        <div className='buttons'>
          <button onClick={(e) => this.logout(e)} onTouchStart={() => {}} className='reset-button'>ログアウト</button>
        </div>

        <div className='header'>
          <div><span className='svg'><Logo /></span></div>
          {/* <Horn /> */}
          <div><span className='main-title'>アンケート</span></div>
        </div>

        <div className='sizechange'>
          <label>文字サイズ</label>
          <span onClick={() => this.setState({fontSize: 'small'})} className={this.state.fontSize === 'small' ? 'on' : ''}>小</span>
          <span onClick={() => this.setState({fontSize: 'medium'})} className={this.state.fontSize === 'medium' ? 'on' : ''}>中</span>
          <span onClick={() => this.setState({fontSize: 'large'})} className={this.state.fontSize === 'large' ? 'on' : ''}>大</span>
        </div>
        <div className='header-text'>
          <p>以下の内容でよろしければ最下部の送信ボタンを押してください。</p>
        </div>
        <div className='form'>
          <form>
            <div>

              <h2 className={'title ' + this.state.fontSize}>{q.c1.title}</h2>

              <div className='frame'>

                <label htmlFor='text101'>{q.c1.q1}</label>
                <p>{this.state.text101 ? this.editText(this.state.text101) : <span className='blank'>なし</span>}</p>

                <label htmlFor='text102'>{q.c1.q2}</label>
                <p>{this.state.text102 ? this.editText(this.state.text102) : <span className='blank'>なし</span>}</p>

              </div>

            </div>
            <div>

              <h2 className={'title ' + this.state.fontSize}>{q.c2.title}</h2>

              <div className='frame'>

                <label htmlFor='text201'>{q.c2.q1}</label>
                <p>{this.state.text201 ? this.editText(this.state.text201) : <span className='blank'>なし</span>}</p>

                <label htmlFor='text202'>{q.c2.q2}</label>
                <p>{this.state.text202 ? this.editText(this.state.text202) : <span className='blank'>なし</span>}</p>

                <label htmlFor='text203'>{q.c2.q3}</label>
                <p>{this.state.text203 ? this.editText(this.state.text203) : <span className='blank'>なし</span>}</p>

              </div>

            </div>
            <div>

              <h2 className={'title ' + this.state.fontSize}>{q.c3.title}</h2>

              <div className='frame'>

                <label htmlFor='text301'>{q.c3.q1}</label>
                <p>{this.state.text301 ? this.editText(this.state.text301) : <span className='blank'>なし</span>}</p>

              </div>

            </div>
            <div>

              <h2 className={'title ' + this.state.fontSize}>{q.c4.title}</h2>

              <div className='frame'>

                <label htmlFor='text401'>{q.c4.q1}</label>
                <p>{this.state.text401 ? this.editText(this.state.text401) : <span className='blank'>なし</span>}</p>

                <label htmlFor='text402'>{q.c4.q2}</label>
                <p>{this.state.text402 ? this.editText(this.state.text402) : <span className='blank'>なし</span>}</p>

              </div>

            </div>

            <button onClick={(e) => this.sendMessage(e)} onTouchStart={() => {}} className='highlight' disabled={disable}>{buttonText}</button>
            <button onClick={(e) => this.changeInputMode(e)} onTouchStart={() => {}} disabled={disable}>もどる</button>

          </form>
        </div>
      </div>
    )
  }

  render () {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    const inputText = (
      this.state.text101 || 
      this.state.text102 ||
      this.state.text201 ||
      this.state.text202 ||
      this.state.text203 ||
      this.state.text301 ||
      this.state.text401 ||
      this.state.text402
    ) ? true : false
    if (this.state.mode === 'check') return this.renderCheck()
    if (this.state.mode === 'sent') return this.renderSent()
    const disable = this.state.sending ? false : true
    const buttonText = this.state.sending ? '確認' : '送信しています...'
    const resetButton = inputText ? <button onClick={(e) => this.reset(e)} onTouchStart={() => {}} className='reset-button'>入力をリセット</button> : ''
    const checkButton = inputText ? <button onClick={(e) => this.changeCheckMode(e)} onTouchStart={() => {}} className='highlight' disabled={disable}>{buttonText}</button> : <div className='dummy'>確認</div>
    return (
      <div className={'survey ' + this.state.fontSize}>
        <Toast />

        <div className='buttons'>
          {resetButton}
          <button onClick={(e) => this.logout(e)} onTouchStart={() => {}} className='reset-button'>ログアウト</button>
        </div>

        <div className='header'>
          <div><span className='svg'><Logo /></span></div>
          <Horn />
          <div><span className='main-title'>アンケート</span></div>
        </div>

        <div className='sizechange'>
          <label>文字サイズ</label>
          <span onClick={() => this.setState({fontSize: 'small'})} className={this.state.fontSize === 'small' ? 'on' : ''}>小</span>
          <span onClick={() => this.setState({fontSize: 'medium'})} className={this.state.fontSize === 'medium' ? 'on' : ''}>中</span>
          <span onClick={() => this.setState({fontSize: 'large'})} className={this.state.fontSize === 'large' ? 'on' : ''}>大</span>
        </div>
        <div className='header-text'>
          <p className='headerfor'>会員各位</p>
          <p className='headerfrom'>事務局より</p>
          <p>第32回定期演奏会、お疲れさまでした。</p>
          <p>反省会を開くにあたり、前もって意見を募集したく簡単ですがアンケートを作成いたしました。今回の定期演奏会に関して、反省・感想・意見・提案等なんでも(個人的なことでも)構いませんので記入をお願いいたします。</p>
          <p>アンケートは匿名です。各項目をすべて埋める必要はございません。また、気づいたことがあればその都度何度でも送信してください。</p>
          <p>回答期限は11月2日(土)23:59までとさせていただきます。</p>
        </div>
        <div className='form'>
          <form>
            <div>

              <h2 className={'title ' + this.state.fontSize}>{q.c1.title}</h2>

              <div className='frame'>

                <label htmlFor='text101'>{q.c1.q1}</label>
                <textarea id='text101' className={'textarea ' + this.state.fontSize} value={this.state.text101} onChange={(e) => this.textChange('text101', e)} />

                <label htmlFor='text102'>{q.c1.q2}</label>
                <textarea id='text102' className={'textarea ' + this.state.fontSize} value={this.state.text102} onChange={(e) => this.textChange('text102', e)} />

              </div>

            </div>
            <div>

              <h2 className={'title ' + this.state.fontSize}>{q.c2.title}</h2>

              <div className='frame'>

                <label htmlFor='text201'>{q.c2.q1}</label>
                <textarea id='text201' className={'textarea ' + this.state.fontSize} value={this.state.text201} onChange={(e) => this.textChange('text201', e)} />

                <label htmlFor='text202'>{q.c2.q2}</label>
                <textarea id='text202' className={'textarea ' + this.state.fontSize} value={this.state.text202} onChange={(e) => this.textChange('text202', e)} />

                <label htmlFor='text203'>{q.c2.q3}</label>
                <textarea id='text203' className={'textarea ' + this.state.fontSize} value={this.state.text203} onChange={(e) => this.textChange('text203', e)} />

              </div>
  
            </div>
            <div>

              <h2 className={'title ' + this.state.fontSize}>{q.c3.title}</h2>

              <div className='frame'>

                <label htmlFor='text301'>{q.c3.q1}</label>
                <textarea id='text301' className={'textarea ' + this.state.fontSize} value={this.state.text301} onChange={(e) => this.textChange('text301', e)} />

              </div>

            </div>
            <div>

              <h2 className={'title ' + this.state.fontSize}>{q.c4.title}</h2>

              <div className='frame'>

                <label htmlFor='text401'>{q.c4.q1}</label>
                <textarea id='text401' className={'textarea ' + this.state.fontSize} value={this.state.text401} onChange={(e) => this.textChange('text401', e)} />

                <label htmlFor='text402'>{q.c4.q2}</label>
                <textarea id='text402' className={'textarea ' + this.state.fontSize} value={this.state.text402} onChange={(e) => this.textChange('text402', e)} />

              </div>

            </div>

            {checkButton}

          </form>
        </div>
      </div>
    )
  }
}