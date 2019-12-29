import React from 'react'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const list = [
    {key: 'man', label: '男性'},
    {key: 'woman', label: '女性'},
    {key: 'other', label: 'その他'}
  ]
  const change = (e) => {
    const newAnswer = {
      ...answer,
      a2: {value: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const showAnswer = () => {
    if (mode === 0) {
      return (
        <div className='answer'>
          <div className='radio'>
            {(() => {
              return list.map((each, i) => {
                return <div key={'a2' + i}><input type='radio' id={'a2' + each.key} value={each.key} checked={answer.a2.value === each.key} onChange={(e) => change(e)} /><label htmlFor={'a2' + each.key}><span>{each.label}</span></label></div>
              })
            })()}
          </div>
        </div>
      )
    } else {
      return (
        <div className='answer check'>
          {(() => {
            const res = list.filter((e) => e.key === answer.a2.value)[0]
            return res ? <p>{res.label}</p> : <p className='no'>回答なし</p>
          })()}
        </div>
      )
    }
  }
  return (
    <div className={'question second-question' + fontSize}>
      <h2 className={fontSize}>{question.q2.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question