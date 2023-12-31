const mongoose  = require('mongoose')

const infoSchema = new mongoose.Schema({
  Osoite: {type: String},
  Alku: {type: Date},
  Loppu: {type: Date},
  Maksu: {type: Number},
  Ikäraja: {type: Number},
  Tila: {type: String},
  Koneet: {type: Number},
  Tilinumero: {type: String}
})


infoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Info", infoSchema)