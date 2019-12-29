import React from 'react'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const list = [
    {key: 'yes', label: '経験あり'},
    {key: 'no', label: '経験なし'}
  ]
  const radioChange = (e) => {
    const newAnswer = {
      ...answer,
      a5: {...answer.a5, value: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const textChange1 = (e) => {
    const newAnswer = {
      ...answer,
      a5: {...answer.a5, text1: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const checkboxChange = (e) => {
    const newAnswer = {
      ...answer,
      a5: {...answer.a5, check: !answer.a5.check}
    }
    updateAnswer(newAnswer)
  }
  const textChange2 = (e) => {
    const value = e.target.value.replace(/[０-９]/g, (s) => {return String.fromCharCode(s.charCodeAt(0)-0xFEE0)}).replace(/[^0-9]/g, '')
    const newAnswer = {
      ...answer,
      a5: {...answer.a5, text2: value}
    }
    updateAnswer(newAnswer)
  }
  const showText1 = () => {
    if (answer.a5.value === 'yes') {
      return (
        <div className='text'>
          <input
            type='text'
            className={fontSize}
            value={answer.a5.text1 ? answer.a5.text1 : ''}
            onChange={(e) => textChange1(e)}
            placeholder='楽器名'
          />
        </div>
      )
    }
  }
  const showText2 = () => {
    if (answer.a5.value === 'yes') {
      return (
        <div className='text'>
          <input
            type='text'
            className={'figure ' + (answer.a5.text2 ? 'active' : '') + fontSize}
            value={answer.a5.text2 ? answer.a5.text2 : ''}
            onChange={(e) => textChange2(e)}
            pattern='\d*'
            placeholder='経験年数'
          />
          <span>年</span>
        </div>
      )
    }
  }
  const showCheckbox = () => {
    if (answer.a5.value === 'yes') {
      return (
        <div className='checkbox'>
          <input
            type='checkbox'
            id='active'
            className={fontSize}
            checked={answer.a5.check}
            onChange={(e) => checkboxChange(e)}
          />
          <label htmlFor='active'>現役</label>
        </div>
      )
    }
  }
  const showAnswer = () => {
    if (mode === 0) {
      return (
        <div className='answer'>
          <div className='radio'>
            {(() => {
              return list.map((each, i) => {
                return <div key={'a5' + i}><input type='radio' id={'a5' + each.key} value={each.key} checked={answer.a5.value === each.key} onChange={(e) => radioChange(e)} /><label htmlFor={'a5' + each.key}><span>{each.label}</span></label></div>
              })
            })()}
          </div>
          {showText1()}
          {showText2()}
          {showCheckbox()}
        </div>
      )
    } else {
      return (
        <div className='answer check'>
          {(() => {
            const res = list.filter((e) => e.key === answer.a5.value)[0]
            return res ? <p>{res.label}</p> : <p className='no'>回答なし</p>
          })()}
          {(() => {
            if (answer.a5.value === 'yes') {
              return answer.a5.text1 !== '' ? <p>{answer.a5.text1}</p> : <p className='no'>回答なし</p>
            }
          })()}
          {(() => {
            if (answer.a5.value === 'yes') {
              return answer.a5.text2 !== '' ? <p>{answer.a5.text2 + '年'}</p> : <p className='no'>回答なし</p>
            }
          })()}
          {(() => {
            if (answer.a5.value === 'yes') {
              return (
                <div className='checkbox'>
                  <input
                    type='checkbox'
                    id='active'
                    className={fontSize}
                    checked={answer.a5.check}
                    disabled='disabled'
                  />
                  <label htmlFor='active'>現役</label>
                </div>
              )
            }
          })()}
        </div>
      )
    }
  }
  return (
    <div className={'question fifth-question' + fontSize}>
      <h2 className={fontSize}>{question.q5.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question