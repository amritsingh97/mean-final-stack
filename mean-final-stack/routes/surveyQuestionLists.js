var express = require( 'express' )
var router = express.Router()

// (2) Include the correct controller
// ...
var surveyQuestionsListsController = require('../controllers/surveyQuestionListsController')

router.get('/', surveyQuestionsListsController.index)
// (2) Route to make a new survey question list
// ...
router.get('/new', surveyQuestionsListsController.new)
// (2) Route to show a survey question list
// ...
router.get('/:id', surveyQuestionsListsController.show)
// (2) Route to edit a survey question list
// ...
router.get('/:id/edit', surveyQuestionsListsController.edit)
// (2) Route to send a new survey question list so it is created
// ...
router.post('/', surveyQuestionsListsController.create)
// (2) Route to send an edited survey question list so it is updated
// ...
router.post('/:id', surveyQuestionsListsController.update)
// (2) Route to delete a survey question list
// ...
router.get('/:id/delete', surveyQuestionsListsController.delete)

module.exports = router