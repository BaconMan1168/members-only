const indexController = require('../controllers/indexController')
const { Router } = require('express');

const indexRouter = Router();

indexRouter.get('/', indexController.getHomePage);
indexRouter.get('/create-message', indexController.getMessageForm);
indexRouter.post('/create-message', indexController.postMessage);
indexRouter.post('/delete-message', indexController.deleteMessage);

module.exports = indexRouter;