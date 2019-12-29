import React from 'react'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const list = [
    {key: 'member', label: '会員より'},
    {key: 'poster', label: 'ポスター'},
    {key: 'paper', label: 'チラシ'},
    {key: 'letter', label: '案内状'},
    {key: 'website', label: 'ホームページ'},
    {key: 'sns', label: 'SNS'},
    {key: 'other', label: 'その他'},
  ]
  const checkboxChange = (e) => {
    const newAnswer = {
      ...answer,
      a6: {
        ...answer.a6,
        check: {
          ...answer.a6.check,
          [e.target.id]: !answer.a6.check[e.target.id]
        } }
    }
    updateAnswer(newAnswer)
  }
  const textChange = (e) => {
    const newAnswer = {
      ...answer,
      a6: {...answer.a6, text: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const showText = () => {
    if (answer.a6.check.other) {
      return (
        <div className='text'>
          <input
            type='text'
            className={fontSize}
            value={answer.a6.text ? answer.a6.text : ''}
            onChange={(e) => textChange(e)}
            placeholder='入力できます'
          />
        </div>
      )
    }
  }
  const showAnswer = () => {
    if (mode === 0) {
      return (
        <div className='answer'>
          <div className='checkbox-frame'>
            {(() => {
              return list.map((each, i) => {
                return <Checkbox key={'a6' + i} id={each.key} label={each.label} answer={answer} fontSize={fontSize} checkboxChange={checkboxChange} disabled={false} />
              })
            })()}
          </div>
          {showText()}
        </div>
      )
    } else {
      return (
        <div className='answer check'>
          <div className='checkbox-frame'>
            {(() => {
              return list.map((each, i) => {
                return <Checkbox key={'a6' + i} id={each.key} label={each.label} answer={answer} fontSize={fontSize} checkboxChange={checkboxChange} disabled={true} />
              })
            })()}
          </div>
          {(() => {
            if (answer.a6.check.other) {
              return answer.a6.text !== '' ? <p>{answer.a6.text}</p> : <p className='no'>回答なし</p>
            }
          })()}
        </div>
      )
    }
  }
  return (
    <div className={'question sixth-question' + fontSize}>
      <h2 className={fontSize}>{question.q6.title}</h2>
      {showAnswer()}
    </div>
  )
}

const Checkbox = ({id, label, answer, fontSize, checkboxChange, disabled}) => {
  return (
    <div className='checkbox'>
      <input
        type='checkbox'
        id={id}
        className={fontSize}
        checked={answer.a6.check[id]}
        onChange={(e) => checkboxChange(e)}
        disabled={disabled ? 'disabled' : undefined}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Question