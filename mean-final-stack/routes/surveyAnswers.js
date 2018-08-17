var express = require( 'express' )
var router = express.Router()

// (2) Include the correct controller
// ...
var surveyAnswersController = require('../controllers/surveyAnswersController');


// (2) Route to show all the survey answers
// ...
router.get('/', surveyAnswersController.index);

// (2) Route to create a new survey answer (the path has been provided)
/* .... '/new/:surveyQuestionListID' .... */
router.get('/new/:id', surveyAnswersController.new);

// (2) Route to show a survey answer
// ...
router.get('/:id', surveyAnswersController.show);

// (2) Route to send the new survey answer to be created
// ...
router.post('/', surveyAnswersController.create);


module.exports = router