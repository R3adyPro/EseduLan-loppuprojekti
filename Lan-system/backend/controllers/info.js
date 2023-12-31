const infoRouter = require('express').Router()
const Info = require('../models/info')

infoRouter.get('/', async (request, response) => {
  const data = await Info.find({})
  response.json(data)
})

infoRouter.post('/', async (request, response) => {
  const {Osoite, Alku, Loppu, Maksu, Ikäraja, Tila, Koneet, Tilinumero} = request.body
  const data = new Info({Osoite, Alku, Loppu, Maksu, Ikäraja, Tila, Koneet, Tilinumero}) //ei käytetä 
  const savedInfo = await data.save()
  response.status(201).json(savedInfo)
})

infoRouter.put('/:id', async (request, response) => {
  const id = request.params.id 
  const status = request.body
  console.log(id)
  
  const updatedInfo = await Info.findByIdAndUpdate(id, status)
  updatedInfo ? response.status(200).json(updatedInfo.toJSON()) : response.status(404).end()
})

module.exports = infoRouter