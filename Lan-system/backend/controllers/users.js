const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const middleware = require("../utils/middleware")

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  
  response.json(users)
  })

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})
  
userRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "missing or invalid token"})
    }

  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

userRouter.post('/', middleware.userExtractor, async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "missing or invalid token"})
    }

  const {username, password} = request.body

    if (username.length < 3 || password.length < 3) {
      return response.status(400).json({
        error: "username & password must be ≥ 3 characters",
      })
    }

  const existingUser = await User.findOne({ username });

    if (existingUser) {
      return response.status(400).json({
        error: "username must be unique",
      })
    }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
      username, 
      passwordHash
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})
  
module.exports = userRouter