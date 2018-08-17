var SurveyAnswer = require( '../models/surveyAnswer' )
var SurveyQuestionList = require( '../models/surveyQuestionList' )

exports.index = (req, res, next) => {
  let locals = { title: 'Survey Answers' }

   SurveyAnswer.find()
  .populate( 'surveyQuestionList' )
  .then( ( surveyAnswers ) => {

    let newArray = [];

    for (let answer of surveyAnswers) {
        if (answer.surveyQuestionList !== null)
          newArray.push(answer);
    }

    locals.answers = newArray;

    res.render('surveyAnswers/index', locals);
  })
  .catch(err => next(err));
}

exports.show = (req, res, next) => {
  let locals = { title: 'Survey' }

  SurveyAnswer.findById( req.params.id )
  .populate( 'surveyQuestionList' )
  .then( ( surveyAnswer ) => {
    locals.answer = surveyAnswer;
    res.render('surveyAnswers/show', locals);
  })
  .catch(err => next(err));
}

exports.new = (req, res, next) => {
  let locals = { title: 'Answer Survey' }

  SurveyQuestionList.findById( req.params.id )
  .then( ( surveyQuestionList ) => {
    locals.survey = surveyQuestionList;
    console.log(surveyQuestionList);
    res.render('surveyAnswers/new', locals);
  })
}

exports.create = (req, res, next) => {
   SurveyAnswer.create({
    surveyQuestionList: req.body.surveyQuestionListID,
    participant: req.body.participant,
    answers: req.body.answers.map( ( ele ) => { return { answer: ele } } )
  })
  .then( () => res.redirect( '/surveyAnswers' ) )
  .catch( err => next(err) );
}