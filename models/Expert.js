const mongoose = require('mongoose')

const ExpertSchema = new Schema({
  requests:[{
    member: {
      type: String
    },
    status: {
      type:String
    }
  }]

})

module.exports = Expert = mongoose.model('expert', ExpertSchema)
