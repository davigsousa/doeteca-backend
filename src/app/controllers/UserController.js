const Yup = require('yup');

const User = require('../models/User');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      twitter_username: Yup.string(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) return res.status(400).json({ error: 'Validation fails.' });

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) return res.status(400).json({ error: 'User already exists.' });

    const {
      id, name, email, twitter_username,
    } = await User.create(req.body);

    return res.json({
      id, name, email, twitter_username,
    });
  }
}

module.exports = new UserController();
