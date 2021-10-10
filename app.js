const express = require('express')
const app = express()

const version = require('project-version')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({limit:'50mb', extended: true}))

// ライブラリの読み込み
const lib = require('./server/lib')

// HTTPを使用する(公開用)
const http = require('http')
app.listen(3002)

const path = require('path')
const NeDB = require('nedb')

// CORSを許可する
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const surveyDB = new NeDB({
  filename: path.join(__dirname, 'data/survey.db'),
  autoload: true,
  timestampData: true
})

const guestDB = new NeDB({
  filename: path.join(__dirname, 'data/guest.db'),
  autoload: true,
  timestampData: true
})

const selectionDB = new NeDB({
  filename: path.join(__dirname, 'selection/selection.db'),
  autoload: true,
  timestampData: true
})

const likeDB = new NeDB({
  filename: path.join(__dirname, 'selection/like.db'),
  autoload: true,
  timestampData: true
})

// クライアントアプリを返す
const client = './client/build'
app.use('/', express.static(client))
app.use('/home', express.static(client))
app.use('/guest', express.static(client))
app.use('/check', express.static(client))
app.use('/close', express.static(client))
app.use('/34thconcert', express.static(client))
app.use('/34thconcert/survey', express.static(client))

// api設定
app.post('/api/login', (req, res) => {
  const passwd = req.body.passwd
  console.log('[' + lib.showTime() + '] api/login: (passwd)')
  if (lib.getHash(passwd) === '0002a3739bc2f722677cb2d9c00450c5b3da7b5972846fef1db51963ba84229eef66baca5251931ce876cc92bda7eb7628a7eed7277d3208d06d13f5ed2acaeb') {
    return res.json({status: true})
  } else {
    return res.json({status: false})
  }
})

app.post('/api/post', (req, res) => {
  const message = req.body.message
  const ip = req.body.ip
  const userAgent = req.body.userAgent
  console.log('[' + lib.showTime() + '] api/post', message, ip, userAgent)
  const reg = {data: message, ip, userAgent}
  surveyDB.insert(reg, (error, newdoc) => {
    if (error) {
      console.log('Database Error')
    } else {
      console.log('Database Insert')
    }
    return res.json({status: true})
  })
})

app.post('/api/post/guest', (req, res) => {
  const answer = req.body.answer
  const time = req.body.time
  const ip = req.body.ip
  const userAgent = req.body.userAgent
  console.log('[' + lib.showTime() + '] api/post/guest', '[' + time + '] ' + ip)
  guestDB.insert({data: answer, ip, userAgent, time}, (err, newdoc) => {
    err ? console.log('Database Error') : console.log('Database Insert')
    return res.json({status: true})
  })
})

// member app
const request = require('superagent')
function auth (session, callback) {
  request.post('https://auth.winds-n.com/auth').type('form').send({session})
  .end((error, response) => {
    if (error) return callback(false)
    if (response.body.status) {
      return callback(true)
    }
  })
}

// prepare, first, second, third, end
app.post('/api/selection/phase', (req, res) => {
  const session = req.body.session
  console.log('[' + lib.showTime() + '] api/selection/phase: ' + session.userid)
  auth(session, (authentication) => {
    if (!authentication) return res.status(403)
    // return res.json({status: true, phase: 'onlyadmin'})
    // return res.json({status: true, phase: 'getmusic'})
    // return res.json({status: true, phase: 'showlist'})
    return res.json({status: true, phase: 'hide'})
  })
})

app.post('/api/selection/detail', (req, res) => {
  const session = req.body.session
  const id = req.body.id
  console.log('[' + lib.showTime() + '] api/selection/detail: ' + session.userid)
  auth(session, (authentication) => {
    if (!authentication) return res.status(403)
    selectionDB.findOne({_id: id}, (err, selection) => {
      if (err || !selection) return res.json({status: false})
      return res.json({status: true, selection})
    })
  })
})

app.post('/api/selection/list', (req, res) => {
  const session = req.body.session
  const query = req.body.query
  const sort = req.body.sort
  const order = req.body.order
  console.log('[' + lib.showTime() + '] api/selection/list: ' + session.userid + ', ' + query, sort, order)
  const sortRequest = {[sort]: parseInt(order)}
  auth(session, (authentication) => {
    if (!authentication) return res.status(403)
    if (query === '') {
      selectionDB.find({}).sort(sortRequest).exec((err, list) => {
        if (err) return res.json({status: false})
        return res.json({status: true, list})
      })
    } else {
      const s = new RegExp(lib.escapeReg(query), 'i')
      const searchQuery = [
        {title: s},
        {titleJa: s},
        {titleEn: s},
        {composer: s},
        {arranger: s}
      ]
      selectionDB.find({$or: searchQuery}).sort(sortRequest).exec((err, list) => {
        if (err) return res.json({status: false})
        return res.json({status: true, list})
      })
    }
  })
})

app.post('/api/selection/post', (req, res) => {
  const session = req.body.session
  const postUserid = req.body.postUserid
  const id = req.body.id
  const remove = req.body.remove
  const selection = fixComposerArranger(req.body.selection)
  console.log('[' + lib.showTime() + '] api/selection/post: ' + session.userid)
  auth(session, (authentication) => {
    if (!authentication) return res.status(403)
    if (id !== 'false' && remove === 'true') {
      console.log('[' + lib.showTime() + '] api/selection/post: remove')
      selectionDB.remove({_id: id}, {}, (err, num) => {
        if (err) return res.json({status: false})
        return res.json({status: true})
      })
    } else if (id === 'false') {
      console.log('[' + lib.showTime() + '] api/selection/post: add')
      console.log({...selection, postUserid, user: session.userid})
      selectionDB.insert({...selection, postUserid, user: session.userid}, (err, newdoc) => {
        if (err) return res.json({status: false})
        return res.json({status: true})
      })
    } else {
      console.log('[' + lib.showTime() + '] api/selection/post: edit')
      console.log({...selection})
      selectionDB.update({_id: id}, {$set: {...selection}}, {}, (err, num) => {
        if (err) return res.json({status: false})
        return res.json({status: true})
      })
    }
  })
})

function fixComposerArranger (data) {
  if (Array.isArray(data.composer)) {
    const composerCount = data.composer.length
    let blank = []
    for (let i=0;i<composerCount;i++) {
      if (data.composer[i].trim() === '') blank.push(i)
    }
    blank.reverse().map((j) => data.composer.splice(j,1))
    if (data.composer.length === 0) data.composer = ['']
  } else {
    data.composer = [data.composer.trim()]
  }
  if (Array.isArray(data.arranger)) {
    const arrangerCount = data.arranger.length
    let blank = []
    for (let i=0;i<arrangerCount;i++) {
      if (data.arranger[i].trim() === '') blank.push(i)
    }
    blank.reverse().map((j) => data.arranger.splice(j,1))
    if (data.arranger.length === 0) data.arranger = ['']
  } else {
    data.arranger = [data.arranger.trim()]
  }
  if (Array.isArray(data.url)) {
    const urlCount = data.url.length
    let blank = []
    for (let i=0;i<urlCount;i++) {
      if (data.url[i].trim() === '') blank.push(i)
    }
    blank.reverse().map((j) => data.url.splice(j,1))
    if (data.url.length === 0) data.url = ['']
  } else {
    data.url = [data.url.trim()]
  }
  return data
}

app.post('/api/selection/like/get', (req, res) => {
  const session = req.body.session
  console.log('[' + lib.showTime() + '] api/selection/like/get: ' + session.userid)
  auth(session, (authentication) => {
    if (!authentication) return res.status(403)
    likeDB.find({}, (err, like) => {
      if (err) return res.json({status: false})
      return res.json({status: true, like})
    })
  })
})

app.post('/api/selection/like/add', (req, res) => {
  const session = req.body.session
  const selectionid = req.body.selectionid
  const likeUserid = req.body.likeUserid
  console.log('[' + lib.showTime() + '] api/selection/like/add: ' + session.userid)
  auth(session, (authentication) => {
    if (!authentication) return res.status(403)
    likeDB.findOne({likeUserid}, (err, doc) => {
      if (err) return res.json({status: false})
      if (!doc) {
        // はじめてのいいね
        console.log('[' + lib.showTime() + '] api/selection/like/add: add, ' + selectionid)
        likeDB.insert({likeUserid, like: [selectionid]}, (insertErr, newdoc) => {
          if (insertErr) return res.json({status: false})
          return res.json({status: true})
        })
      } else {
        let newdoc
        if (doc.like.find(item => item === selectionid)) {
          const likeArray = doc.like.find(item => item !== selectionid) ? doc.like.find(item => item !== selectionid) : []
          // いいね取り消し
          console.log('[' + lib.showTime() + '] api/selection/like/add: remove, ' + selectionid)
          newdoc = Array.isArray(likeArray) ? {
            ...doc,
            like: [
              ...likeArray
            ]
          } : {
            ...doc,
            like: [
              likeArray
            ]
          }
        } else {
          // いいね追加
          console.log('[' + lib.showTime() + '] api/selection/like/add: [add] ' + selectionid)
          newdoc = {
            ...doc,
            like: [
              ...doc.like,
              selectionid
            ]
          }
        }
        likeDB.update({likeUserid}, {...newdoc}, {}, (updateErr, num) => {
          if (updateErr) return res.json({status: false})
          return res.json({status: true})
        })
      }
    })
  })
})