import React from 'react'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const list1 = [
    {key: 'false', label: '選択してください'},
    {key: 'teens', label: '0～10代'},
    {key: 'twenties', label: '20代'},
    {key: 'thirties', label: '30代'},
    {key: 'forties', label: '40代'},
    {key: 'fifties', label: '50代'},
    {key: 'sixties', label: '60代'},
    {key: 'seventies', label: '70代'},
    {key: 'eighties', label: '80代～'},
  ]
  const list2 = [
    {key: 'false', label: '選択してください'},
    {key: 'elementary-student', label: '小学生'},
    {key: 'juniorhigh-student', label: '中学生'},
    {key: 'highschool-student', label: '高校生'},
    {key: 'university-student', label: '大学生'},
    {key: 'working', label: '社会人'},
    {key: 'other', label: 'その他'},
  ]
  const selectChange = (target, e) => {
    const newAnswer = {
      ...answer,
      a3: {...answer.a3, [target]: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const textChange = (e) => {
    const newAnswer = {
      ...answer,
      a3: {...answer.a3, text: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const showText = () => {
    if (answer.a3.occupation === 'working') {
      return (
        <div className='text'>
          <input
            type='text'
            className={fontSize}
            value={answer.a3.text ? answer.a3.text : ''}
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
          <label>{question.q3.sub1}</label>
          <select value={answer.a3.age} className={(answer.a3.age === 'false' ? 'false' : '') + fontSize} onChange={(e) => selectChange('age', e)}>
            {(() => {
              return list1.map((each, i) => {
                return <option key={'a3' + i} value={each.key}>{each.label}</option>
              })
            })()}
          </select>
          <label>{question.q3.sub2}</label>
          <select value={answer.a3.occupation} className={(answer.a3.occupation === 'false' ? 'false' : '') + fontSize} onChange={(e) => selectChange('occupation', e)}>
            {(() => {
              return list2.map((each, i) => {
                return <option key={'a3' + i} value={each.key}>{each.label}</option>
              })
            })()}
          </select>
          {showText()}
        </div>
      )
    } else {
      return (
        <div className='answer check'>
          <label>{question.q3.sub1}</label>
          {(() => {
            const res = list1.filter((e) => e.key === answer.a3.age)[0]
            return res.key !== 'false' ? <p>{res.label}</p> : <p className='no'>回答なし</p>
          })()}
          <label>{question.q3.sub2}</label>
          {(() => {
            const res = list2.filter((e) => e.key === answer.a3.occupation)[0]
            return res.key !== 'false' ? <p>{res.label}</p> : <p className='no'>回答なし</p>
          })()}
          {(() => {
            if (answer.a3.occupation === 'working') {
              return answer.a3.text !== '' ? <p>{answer.a3.text}</p> : <p className='no'>回答なし</p>
            }
          })()}
        </div>
      )
    }
  }
  return (
    <div className={'question third-question' + fontSize}>
      <h2 className={fontSize}>{question.q3.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question