const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Book = require('../app/models/Book');

const models = [User, Book];

const connection = new Sequelize(dbConfig);
models.map((model) => model.init(connection));

Book.associate(connection.models);
