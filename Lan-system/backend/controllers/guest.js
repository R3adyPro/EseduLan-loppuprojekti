const guestRouter = require('express').Router()
const Guest = require('../models/guest')
const middleware = require("../utils/middleware")
const jwt = require('jsonwebtoken')


guestRouter.get('/', async (request, response) => {
  const guests = await Guest.find({})
  response.json(guests)
})

guestRouter.get('/:id', async (request, response) => {
  const guest = await Guest.findById(request.params.id)

  if (guest) {
    response.json(guest.toJSON())
  } else {
    response.status(404).end()
  }
})

guestRouter.post('/', async (request, response) => {
  const {name, email, phone, age, discord, platform, status, parentEmail, parentName, parentPhone, registrationDate} = request.body
  
  const existingEmail = await Guest.findOne({email})
  if (existingEmail) {
    return response.status(400).json({
      error: 'email already registered'
    })
  }

  if (!phone || phone.length < 10) {
    return response.status(400).json({
      error: 'invalid number'
    })
  }

  const guest = new Guest({
    name, email, phone, age, discord, platform, status, parentEmail, parentName, parentPhone, registrationDate
  })

  const savedGuest = await guest.save()
  response.status(201).json(savedGuest)
})

guestRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "missing or invalid token"})
  }

  await Guest.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

guestRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "missing or invalid token"})
  }

  const id = request.params.id
  const status = request.body
  
  const updatedGuest = await Guest.findByIdAndUpdate(id, status)
  updatedGuest ? response.status(200).json(updatedGuest.toJSON()) : response.status(404).end()
})

module.exports = guestRouter