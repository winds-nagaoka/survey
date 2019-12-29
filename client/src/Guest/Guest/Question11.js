import React, { useState } from 'react'

import FocusInput from './FocusInput'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const textChange = (id, value) => {
    const newAnswer = {
      ...answer,
      a11: {...answer.a11, [id]: value}
    }
    updateAnswer(newAnswer)
  }
  const showAnswer = () => {
    if (mode === 0) {
      return (
        <div className='answer'>
          <div className='text'>
            <label>{question.q11.sub1}</label>
            <input
              type='text'
              className={fontSize}
              value={answer.a11.name ? answer.a11.name : ''}
              onChange={(e) => textChange('name', e.target.value)}
              placeholder='お名前'
            />
          </div>
          <FocusInput
            question={question}
            answer={answer}
            textChange={textChange}
            fontSize={fontSize}
          />
        </div>
      )
    } else {
      return (
        <div className='answer check'>
        <div className='text'>
          <label>{question.q11.sub1}</label>
          {(() => {
            return answer.a11.name ? <p>{answer.a11.name}</p> : <p className='no'>回答なし</p>
          })()}
        </div>
        <div className='text postal'>
          <label>{question.q11.sub2}</label>
          {(() => {
            return answer.a11.zipcode ? <p>{answer.a11.zipcode}</p> : <p className='no'>回答なし</p>
          })()}
        </div>
        <div className='text'>
          <label>{question.q11.sub3}</label>
          {(() => {
            return answer.a11.address ? <p>{answer.a11.address}</p> : <p className='no'>回答なし</p>
          })()}
        </div>
      </div>
      )
    }
  }
  return (
    <div className={'question eleventh-question' + fontSize}>
      <h2 className={fontSize}>{question.q11.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question