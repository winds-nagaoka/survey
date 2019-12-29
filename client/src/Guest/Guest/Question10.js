import React from 'react'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const textChange = (id, e) => {
    const newAnswer = {
      ...answer,
      a10: {...answer.a10, [id]: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const showAnswer = () => {
    if (mode === 0) {
      return (
        <div className='answer'>
          <div className='text'>
            <label>{question.q10.sub1}</label>
            <input
              type='text'
              className={fontSize}
              value={answer.a10.text1 ? answer.a10.text1 : ''}
              onChange={(e) => textChange('text1', e)}
              placeholder='入力できます'
            />
          </div>
          <div className='text'>
            <label>{question.q10.sub2}</label>
            <input
              type='text'
              className={fontSize}
              value={answer.a10.text2 ? answer.a10.text2 : ''}
              onChange={(e) => textChange('text2', e)}
              placeholder='入力できます'
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className='answer check'>
          <div className='text'>
            <label>{question.q10.sub1}</label>
            {(() => {
              return answer.a10.text1 !== '' ? <p>{answer.a10.text1}</p> : <p className='no'>回答なし</p>
            })()}
          </div>
          <div className='text'>
            <label>{question.q10.sub2}</label>
            {(() => {
              return answer.a10.text2 !== '' ? <p>{answer.a10.text2}</p> : <p className='no'>回答なし</p>
            })()}
          </div>
        </div>
      )
    }
  }
  return (
    <div className={'question tenth-question' + fontSize}>
      <h2 className={fontSize}>{question.q10.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question