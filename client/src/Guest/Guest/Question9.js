import React from 'react'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const textChange = (e) => {
    const newAnswer = {
      ...answer,
      a9: {...answer.a9, text: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const showAnswer = () => {
    if (mode === 0) {
      return (
        <div className='answer'>
          <div className='text'>
            <input
              type='text'
              className={fontSize}
              value={answer.a9.text ? answer.a9.text : ''}
              onChange={(e) => textChange(e)}
              placeholder='入力できます'
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className='answer check'>
          <div className='text'>
            {(() => {
              return answer.a9.text !== '' ? <p>{answer.a9.text}</p> : <p className='no'>回答なし</p>
            })()}
          </div>
        </div>
      )
    }
  }
  return (
    <div className={'question ninth-question' + fontSize}>
      <h2 className={fontSize}>{question.q9.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question