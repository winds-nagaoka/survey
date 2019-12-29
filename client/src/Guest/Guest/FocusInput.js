import React, { Component } from 'react'
import request from 'superagent'

export default class FocusInput extends Component {
  constructor (props) {
    super(props)
    this.inputRef = React.createRef()
    this.onFocus = this.onFocus.bind(this)
    this.state = {
      zipLoading: false,
      zipError: false
    }
  }

  onFocus () {
    this.inputRef.current.focus()
  }

  requestZipcode () {
    this.setState({zipLoading: true, zipError: false})
    request.post('https://zip.winds-n.com/api/zip')
      .type('form')
      .send({ zip: this.props.answer.a11.zipcode })
      .end((err, res) => {
        this.setState({zipLoading: false})
        if (err || res.body.err || !res.body.zip) return this.setState({zipError: true})
        this.props.answer.a11.address.match(res.body.zip.address) ? false : this.props.textChange('address', res.body.zip.address)
        this.inputRef.current.focus()
      })
  }

  keyPress (e) {
    if (e.which === 13) this.requestZipcode()
  }

  render () {
    const buttonLabel = this.state.zipLoading ? '検索中...' : '自動入力'
    
    const showError = () => {
      if (this.state.zipError) {
        return (
          <div className='err'>
            <p>みつかりませんでした</p>
            <p>入力をお願いします</p>
          </div>
        )
      }
    }

    return (
      <React.Fragment>
        <div className='text postal'>
          <label>{this.props.question.q11.sub2}</label>
          <div>
          <input
            type='text'
            className={this.props.fontSize}
            value={this.props.answer.a11.zipcode ? this.props.answer.a11.zipcode : ''}
            onChange={(e) => this.props.textChange('zipcode', e.target.value)}
            onKeyPress={(e) => this.keyPress(e)}
            placeholder='郵便番号'
            pattern='\d*'
          />
          <button onClick={() => this.requestZipcode()} className={this.props.fontSize} disabled={this.props.answer.a11.zipcode.match(/^[0-9]{3}-?[0-9]{4}/) ? false : true}>{buttonLabel}</button>
          </div>
        </div>
        {showError()}
        <div className='text'>
          <label>{this.props.question.q11.sub3}</label>
          <input
            ref={this.inputRef}
            type='text'
            className={this.props.fontSize}
            value={this.props.answer.a11.address ? this.props.answer.a11.address : ''}
            onChange={(e) => this.props.textChange('address', e.target.value)}
            placeholder='ご住所'
          />
        </div>
      </React.Fragment>
    )
  }
}