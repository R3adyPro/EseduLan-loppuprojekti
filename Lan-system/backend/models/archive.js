const mongoose  = require('mongoose')

const archiveSchema = new mongoose.Schema({
  alku: {type: Date},
  ilmoittautuneet: {type: Number},
  loppu: {type: Date},
  maksaneet: {type: Number},
  töissä: {type: Number},
})


archiveSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Archive", archiveSchema)