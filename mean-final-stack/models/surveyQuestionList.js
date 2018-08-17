const mongoose = require( 'mongoose' )

const QuestionSchema = new mongoose.Schema({

  questionName: {type: String, required: 'Please enter a question.'}

})

const SurveyQuestionListSchema = new mongoose.Schema({
  title: {type:String, required: 'Please enter a title.'},
  surveyor: {type: String, required: 'Please enter who did the survey.'},
  questions: [QuestionSchema]
})

module.exports = mongoose.model( 'Survey', SurveyQuestionListSchema )