const mongoose  = require('mongoose')

const guestSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email:{type: String, required: true},
  phone:{type: String, required: true},
  age:  {type: Number, required: true},
  discord: {type: String, required: true},
  platform:  {type: String, required: true},
  status: {type: String, default: "odottaa"},
  parentName: {type: String}, 
  parentPhone: {type: Number}, 
  parentEmail: {type: String},
  registrationDate: {type: String, default: new Date(Date.now()).toString()}
})


guestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Guest", guestSchema)