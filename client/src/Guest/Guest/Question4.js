import React from 'react'

const Question = ({
  question, answer, mode, fontSize,
  updateAnswer
}) => {
  const firstList = [
    {key: 'false', label: '選択してください'},
    {key: 'nagaoka', label: '長岡市'},
    {key: 'mitsuke', label: '見附市'},
    {key: 'kashiwazaki', label: '柏崎市'},
    {key: 'ojiya', label: '小千谷市'},
    {key: 'sanjo', label: '三条市'},
    {key: 'tsubame', label: '燕市'},
    {key: 'niigata', label: '新潟市'},
    {key: 'uonuma', label: '魚沼市'},
    {key: 'tokamachi', label: '十日町市'},
    {key: 'other', label: 'その他'}
  ]
  const secondList = [
    {key: 'false', label: '選択してください'},
    {key: 'east-nagaoka', label: '東長岡'},
    {key: 'west-nagaoka', label: '西長岡'},
    {key: 'oguni', label: '小国'},
    {key: 'kawaguchi', label: '川口'},
    {key: 'koshiji', label: '越路'},
    {key: 'teradomari', label: '寺泊'},
    {key: 'tochio', label: '栃尾'},
    {key: 'nakanoshima', label: '中之島'},
    {key: 'mishima', label: '三島'},
    {key: 'yamakoshi', label: '山古志'},
    {key: 'yoita', label: '与板'},
    {key: 'washima', label: '和島'}
  ]
  const selectChange = (target, e) => {
    const newAnswer = {
      ...answer,
      a4: {...answer.a4, [target]: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  // const selectChange2 = (e) => {
  //   const newAnswer = {
  //     ...answer,
  //     a4: {...answer.a4, value2: e.target.value}
  //   }
  //   updateAnswer(newAnswer)
  // }
  const textChange = (e) => {
    const newAnswer = {
      ...answer,
      a4: {...answer.a4, text: e.target.value}
    }
    updateAnswer(newAnswer)
  }
  const showSelect = () => {
    if (answer.a4.value1 === 'nagaoka') {
      return (
        <select value={answer.a4.value2} className={(answer.a4.value2 === 'false' ? 'false' : '') + fontSize} onChange={(e) => selectChange('value2', e)}>
            {(() => {
              return secondList.map((each, i) => {
                return <option key={'a4-1' + i} value={each.key}>{each.label}</option>
              })
            })()}
        </select>
      )
    }
  }
  const showText = () => {
    if (answer.a4.value1 === 'other') {
      return (
        <div className='text'>
          <input
            type='text'
            className={fontSize}
            value={answer.a4.text ? answer.a4.text : ''}
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
          <select value={answer.a4.value1} className={(answer.a4.value1 === 'false' ? 'false' : '') + fontSize} onChange={(e) => selectChange('value1', e)}>
            {(() => {
              return firstList.map((each, i) => {
                return <option key={'a4-1' + i} value={each.key}>{each.label}</option>
              })
            })()}
          </select>
          {showSelect()}
          {showText()}
        </div>
      )
    } else {
      return (
        <div className='answer check'>
        {(() => {
            const res = firstList.filter((e) => e.key === answer.a4.value1)[0]
            return res.key !== 'false' ? <p>{res.label}</p> : <p className='no'>回答なし</p>
          })()}
        {(() => {
          if (answer.a4.value1 === 'nagaoka') {
            const res = secondList.filter((e) => e.key === answer.a4.value2)[0]
            return res.key !== 'false' ? <p>{res.label}</p> : <p className='no'>回答なし</p>  
          }
        })()}
        {(() => {
          return answer.a4.value1 === 'other' ? ( answer.a4.text !== '' ? <p>{answer.a4.text}</p> : <p className='no'>回答なし</p>) : false
        })()}
        </div>
      )
    }
  }
  return (
    <div className={'question fourth-question' + fontSize}>
      <h2 className={fontSize}>{question.q4.title}</h2>
      {showAnswer()}
    </div>
  )
}

export default Question