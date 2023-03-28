const mongoose = require('mongoose')

const analyzedSpeechesSchema = new mongoose.Schema({
  transcript: {
    type: String
  },
  facialEmotion: {
  },
  speechEmotion: {
  },
  tone: {
  },
  emphasis: {
  },
  recommendation: {
  }
})

const AnalyzedSpeechesModel = mongoose.model("speeches", analyzedSpeechesSchema)
module.exports = AnalyzedSpeechesModel