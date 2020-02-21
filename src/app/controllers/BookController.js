const { Op } = require('sequelize');
const Yup = require('yup');

const Book = require('../models/Book');
const User = require('../models/User');

class BookController {
  async index(req, res) {
    const { page = 1, q, id } = req.query;

    const options = {
      where: {
        active: true,
      },
      order: ['created_at'],
      attributes: ['id', 'name', 'author', 'thumbnail', 'suggested_link'],
      limit: 18,
      offset: (page - 1) * 18,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'twitter_username'],
        },
      ],
    };

    if (id) {
      const book = await Book.findByPk(id);
      return res.json(book);
    }

    if (q) options.where.name = { [Op.iLike]: q };

    const { count, rows: books } = await Book.findAndCountAll(options);

    const totalPages = Math.ceil(count / 18);

    return res.json({
      totalPages, books,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      author: Yup.string().required(),
      thumbnail: Yup.string(),
      suggested_link: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) return res.status(400).json({ error: 'Validation fails.' });

    const user_id = req.userId;
    const {
      name, author, thumbnail, suggested_link,
    } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ error: 'User not found.' });

    try {
      await Book.create({
        user_id, name, author, thumbnail, suggested_link,
      });
    } catch (e) {
      return res.status(400).json({ error: e.errors[0].message });
    }

    return res.json({
      user: {
        name: user.name,
        email: user.email,
      },
      book: {
        name, author, thumbnail, suggested_link,
      },
    });
  }

  async destroy(req, res) {
    const book = await Book.findByPk(req.params.id);

    if (!book.checkOwner(req.userId)) {
      return res.status(401).json({ error: 'You are not authorized.' });
    }

    await Book.destroy({ where: { id: book.id } });

    return res.json(book);
  }

  async toggleStatus(req, res) {
    const book = await Book.findByPk(req.params.id);

    if (!book.checkOwner(req.userId)) {
      return res.status(401).json({ error: 'You are not authorized.' });
    }

    await book.update({ active: !book.active });

    return res.json(book);
  }
}

module.exports = new BookController();
