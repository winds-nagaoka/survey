import React from 'react'
import * as lib from '../../Component/Library/Library'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const textChange = (id, e) => {
    const newAnswer = {
      ...answer,
      a7: {...answer.a7, [id]: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const showAnswer = () => {
    if (mode === 0) {
      return (
        <div className='answer'>
          <div className='text'>
            <label>{question.q7.sub1}</label>
            <textarea
              className={fontSize}
              value={answer.a7.text1 ? answer.a7.text1 : ''}
              onChange={(e) => textChange('text1', e)}
              placeholder='入力できます'
            ></textarea>
          </div>
          <div className='text'>
            <label>{question.q7.sub2}</label>
            <textarea
              className={fontSize}
              value={answer.a7.text2 ? answer.a7.text2 : ''}
              onChange={(e) => textChange('text2', e)}
              placeholder='入力できます'
            ></textarea>
          </div>
        </div>
      )
    } else {
      return (
        <div className='answer check'>
          <div className='text'>
            <label>{question.q7.sub1}</label>
            {(() => {
              return answer.a7.text1 !== '' ? <p>{lib.editText(answer.a7.text1)}</p> : <p className='no'>回答なし</p>
            })()}
          </div>
          <div className='text'>
            <label>{question.q7.sub2}</label>
            {(() => {
              return answer.a7.text2 !== '' ? <p>{lib.editText(answer.a7.text2)}</p> : <p className='no'>回答なし</p>
            })()}
          </div>
        </div>
      )
    }
  }
  return (
    <div className={'question seventh-question' + fontSize}>
      <h2 className={fontSize}>{question.q7.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question