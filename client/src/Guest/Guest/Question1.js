import React from 'react'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const list = [
    {key: 'false', label: '選択してください'},
    {key: 'first', label: 'はじめて'},
    {key: 'second', label: '2回'},
    {key: 'third-fifth', label: '3～5回'},
    {key: 'sixth-tenth', label: '6～10回'},
    {key: 'eleventh-twentieth', label: '11～20回'},
    {key: 'over-twenty-first', label: '21回以上'},
    {key: 'other', label: '入力する'}
  ]
  const selectChange = (e) => {
    const newAnswer = {
      ...answer,
      a1: {...answer.a1, value: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const textChange = (e) => {
    const value = e.target.value.replace(/[０-９]/g, (s) => {return String.fromCharCode(s.charCodeAt(0)-0xFEE0)}).replace(/[^0-9]/g, '')
    const newAnswer = {
      ...answer,
      a1: {...answer.a1, text: value}
    }
    updateAnswer(newAnswer)
  }
  const showText = () => {
    if (answer.a1.value === 'other') {
      return (
        <div className='text'>
          <input
            type='text'
            className={'figure ' + (answer.a1.text ? 'active' : '') + fontSize}
            value={answer.a1.text ? answer.a1.text : ''}
            onChange={(e) => textChange(e)}
            pattern='\d*'
            placeholder='回数を入力できます'
          />
          <span>回</span>
        </div>
      )
    }
  }
  const showAnswer = () => {
    if (mode === 0) {
      return (
        <div className='answer'>
          <select value={answer.a1.value} className={(answer.a1.value === 'false' ? 'false' : '') + fontSize} onChange={(e) => selectChange(e)}>
            {(() => {
              return list.map((each, i) => {
                return <option key={'a1' + i} value={each.key}>{each.label}</option>
              })
            })()}
          </select>
          {showText()}
        </div>
      )
    } else {
      return (
        <div className='answer check'>
          {(() => {
            const res = list.filter((e) => e.key === answer.a1.value)[0]
            return res.key !== 'false' ? <p>{res.label}</p> : <p className='no'>回答なし</p>
          })()}
          {(() => {
            if (answer.a1.value === 'other') {
              return answer.a1.text !== '' ? <p>{answer.a1.text + '回'}</p> : <p className='no'>回答なし</p>
            }
          })()}
        </div>
      )
    }
  }
  return (
    <div className={'question first-question' + fontSize}>
      <h2 className={fontSize}>{question.q1.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question