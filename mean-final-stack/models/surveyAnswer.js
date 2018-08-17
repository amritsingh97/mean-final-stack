const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema

const AnswerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: 'Please enter answer.'
  }
})

const SurveyAnswerSchema = new mongoose.Schema({
  surveyQuestionList: { type: Schema.Types.ObjectId, ref: 'Survey' },
  participant: {
    type: String,
    required: 'Participant is required.'
  },
  answers: [AnswerSchema]
})

module.exports = mongoose.model('SurveyAnswer', SurveyAnswerSchema);