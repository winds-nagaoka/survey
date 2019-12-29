import React from 'react'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const textChange = (e) => {
    const newAnswer = {
      ...answer,
      a8: {...answer.a8, text: e.target.value}
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
              value={answer.a8.text ? answer.a8.text : ''}
              onChange={(e) => textChange(e)}
              placeholder='入力できます'
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className='answer check'>
          {(() => {
            return answer.a8.text !== '' ? <p>{answer.a8.text}</p> : <p className='no'>回答なし</p>
          })()}
        </div>
      )
    }
  }
  return (
    <div className={'question eighth-question' + fontSize}>
      <h2 className={fontSize}>{question.q8.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question