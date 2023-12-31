
const config = require('./utils/config')
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const mWare = require('./utils/middleware')
require('express-async-errors')

const guestRouter = require('./controllers/guest')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const infoRouter = require('./controllers/info')
const archiveRouter = require('./controllers/archive')
const logger = require('./utils/logger')

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  }) .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

  app.use(cors())
  app.use(express.json())
  app.use(mWare.tokenExtractor)
  app.use('/api/guests', guestRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/users', userRouter)
  app.use('/api/info', infoRouter)
  app.use('/api/archive', archiveRouter)
  app.use(mWare.errorHandler)

  app.use(express.static(path.join(__dirname, 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

module.exports = app