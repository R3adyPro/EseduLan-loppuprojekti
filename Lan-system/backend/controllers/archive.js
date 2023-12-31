const archiveRouter = require('express').Router()
const Archive = require('../models/archive')
const middleware = require("../utils/middleware")

archiveRouter.get('/', async (request, response) => {
    const archives = await Archive.find({})
    response.json(archives)
  })
  

  archiveRouter.post('/', async (request, response) => {
    const {alku, loppu, ilmoittautuneet, maksaneet, töissä} = request.body
    
    const archive = new Archive({
      alku, loppu, ilmoittautuneet, maksaneet, töissä
    })
    const savedArchive = await archive.save()
    response.status(201).json(savedArchive)
  })

  module.exports = archiveRouter
  