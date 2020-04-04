const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('./database');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors({
      methods: 'GET, PUT, POST, DELETE',
      origin: '*',
    }));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
