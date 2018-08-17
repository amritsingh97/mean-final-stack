var Survey = require('../models/surveyQuestionList')

exports.index = ( req, res, next ) => {
  let locals = { title: 'Surveys' }

  Survey.find()
  .then( ( surveyQuestionLists ) => {
    locals.surveys = surveyQuestionLists

    res.render( 'surveyQuestionLists/index', locals)
  })
  .catch(function (err) {
    next( err )
  })
}

exports.show = ( req, res, next ) => {
  let locals = { title: 'Survey' }

  Survey.findById( req.params.id )
  .then( ( surveyQuestionList ) => {
    locals.survey = surveyQuestionList;

    res.render( 'surveyQuestionLists/show', locals);
  })
  .catch(function (err) {
    next( err )
  })
}

exports.new = ( req, res, next ) => {
  let locals = { title: 'New Survey' }

  res.render( 'surveyQuestionLists/new', locals )
}

exports.edit = ( req, res, next ) => {
  let locals = { title: 'Edit Survey' }

  Survey.findById( req.params.id )
  .then( ( surveyQuestionList ) => {
    locals.survey = surveyQuestionList

    res.render('surveyQuestionLists/edit', locals)
  })
  .catch(function ( err ){
    next( err )
  })
}

exports.create = (  req, res, next ) => {
  console.log( req.body.questions )
  Survey.create({
    title: req.body.title,
    surveyor: req.body.surveyor,
    questions: req.body.questions.map( ( ele ) => { return { questionName: ele } } )
  })
  .then( () => res.redirect( '/surveyQuestionLists' ) )
  .catch(function (err){
    next( err )
  })
}

exports.update = ( req, res, next ) => {
  Survey.findById( req.params.id )
  .then( ( surveyQuestionList ) => {
    
    surveyQuestionList.title = req.body.title;
    surveyQuestionList.surveyor = req.body.surveyor;
    surveyQuestionList.questions = req.body.questions.map( ( ele ) => { return { questionName: ele } } );

    surveyQuestionList.save()
    .then( () => res.redirect( '/surveyQuestionLists' ) )
    .catch(function (err){
      next( err )
    })
  })
  .catch(function (err){
    next( err )
  })

}

exports.delete = ( req, res, next ) => {

  Survey.remove( { _id: req.params.id } )
  .then( () => res.redirect('/surveyQuestionLists') )
  .catch(function (err){
    next( err )
  })
}
