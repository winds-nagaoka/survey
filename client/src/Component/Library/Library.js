import React from 'react'

const version = '0.0.1'

export function getVersion () {
  return version
}

export function editText (text) {
  const regExp = /(https?:\/\/\S+|\n)/;
  const brExp = /\n/
  return text.split(regExp).map(function (line,i) {
      return line.match(brExp) ? (<br key={i} />) : line
  })
}

export function unixTimeFull (intTime) {
  const time =  intTime || new Date().getTime()
  var d = new Date(time)
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  var hour = ('0' + d.getHours()).slice(-2)
  var min = ('0' + d.getMinutes()).slice(-2)
  // var sec = ('0' + d.getSeconds()).slice(-2)
  return (year + '/' + month + '/' + day + ' ' + hour + ':' + min)
}

export function getYear () {
  var d = new Date()
  var year = d.getFullYear()
  return (year)
}

export function unixDate (intTime) {
  var d = new Date(intTime)
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  return (year + '/' + month + '/' + day)
}

export function unixTime (intTime) {
  var d = new Date(intTime)
  var hour = ('0' + d.getHours()).slice(-2)
  var min  = ('0' + d.getMinutes()).slice(-2)
  return (hour + ':' + min);
}

export function makeLine (array) {
  var s = ''
  for (var i = 0; i<array.length; i++) {
    s += array[i] + ', '
  }
  s = s.slice(0, -2)
  // if (s === '') {
  //   s = 'No Data'
  // }
  return s
}

export function playTime (t) {
  var hms = ''
  var h = t / 3600 | 0
  var m = t % 3600 / 60 | 0
  var s = t % 60
  const z2 = (v) => {
    const s = '00' + v
    return s.substr(s.length - 2, 2)
  }
  if(h != 0){
    hms = h + ':' + z2(m) + ':' + z2(s)
  }else if(m != 0){
    hms = z2(m) + ':' + z2(s)
  }else{
    hms = '00:' + z2(s)
  }
  return hms
}

export function getMediaData (id, num) {
  if (concertStore.list) {
    return (getConcertList(id)[num])
    // var list = getConcertList(id)[num]
    // return list.title
  }
}

export function getAudioTitle (id, num) {
  if (concertStore.list) {
    return (getConcertList(id)[num]).title
    // var list = getConcertList(id)[num]
    // return list.title
  }
}

export function getAudioComposer (id, num) {
  if (concertStore.list) {
    var list = getConcertList(id)[num]
    const composer = 'composer' in list ? 'arranger' in list ? <span className='composer'>{list.composer}{list.composer.match(/民謡/) ? '' : '作曲'}<span>/</span>{list.arranger}編曲</span> : <span className='composer'>{list.composer}</span> : ''
    return composer
    // 'composer' in data[ml] ? 'arranger' in data[ml] ? <span className='composer'>{data[ml].composer}{data[ml].composer.match(/民謡/) ? '' : '作曲'}/{data[ml].arranger}編曲</span> : <span className='composer'>{data[ml].composer}</span> : ''
  }
}

export function getAudioComposerText (id, num) {
  if (concertStore.list) {
    var list = getConcertList(id)[num]
    return list.composer ? list.composer : ''
  }
}

export function getAudioArrangerText (id, num) {
  if (concertStore.list) {
    var list = getConcertList(id)[num]
    return list.arranger ? list.arranger : ''
  }
}

export function getConcertTitle (id) {
  if (concertStore.list) {
    return (getConcert(id)).detail.title
  }
}

export function getConcertType (id) {
  if (concertStore.list) {
    return (getConcert(id)).type
  }
}

export function getConcertMusicLabel (id, num) {
  if (concertStore.list) {
    const concert = getConcert(id).detail
    // console.log(id, concert)
    return concert.contents.filter((e) => {
      // console.log(e.music.indexOf(num))
      // console.log(num, e.music,e.music.indexOf(num))
      if (e.music.indexOf(num) >= 0) return e
    })[0].label
  }
}

export function getConcert (id) {
  if (concertStore.list) {
    return concertStore.list.filter((e) => {return e.id === id})[0]
  }
}

// for Local Not exports
export function getConcertList (id) {
  var concert = getConcert(id)
  var detail = concert.detail
  return detail.data
}

export function listReverse (array, a) {
  var data = JSON.parse(JSON.stringify(array))
  return a ? data.reverse() : data
}

export function labeling (label, contents) {
  return (<div><span>{label}</span><span>{contents}</span></div>)
}

export function escapeReg (string) {
  const reRegExp = /[\\^$.*+?()[\]{}|]/g
  const reHasRegExp = new RegExp(reRegExp.source)
  return (string && reHasRegExp.test(string)) ? string.replace(reRegExp, '\\$&') : string
}

export function getNextConcert (id) {
  if (concertStore.list) {
    // console.log(concertStore.list)
    const type = getConcert(id).type
    const list = concertStore.list.filter((e) => {return e.type === type})
    // console.log(list)
    var next = undefined
    list.forEach((e, i) => {
      if (e.id === id) next = i + 1
      return
    })
    if (next > (list.length - 1)) {
      return false
    } else {
      // console.log('next', list[next].id)
      return list[next].id
    }
  }
}

export function getPrevConcert (id) {
  if (concertStore.list) {
    const type = getConcert(id).type
    const list = concertStore.list.filter((e) => {return e.type === type})
    var prev = undefined
    list.forEach((e, i) => {
      if (e.id === id) prev = i - 1
      return
    })
    if (prev < 0) {
      return false
    } else {
      // console.log('prev', list[prev].id)
      return list[prev].id
    }
  }
}