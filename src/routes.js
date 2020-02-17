const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const BookController = require('./app/controllers/BookController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/books', BookController.index);

routes.use(authMiddleware);

routes.post('/books', BookController.store);
routes.put('/books/:id/toggle', BookController.toggleStatus);
routes.delete('/books/:id', BookController.destroy);

module.exports = routes;
