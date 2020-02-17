const Sequelize = require('sequelize');

class Book extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      author: Sequelize.STRING,
      thumbnail: Sequelize.STRING,
      suggested_link: Sequelize.STRING,
      active: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
  }

  checkOwner(userId) {
    return this.user_id === userId;
  }
}

module.exports = Book;
