const Yup = require('yup');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');
const User = require('../models/User');

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) return res.status(400).json({ error: 'Validation fails.' });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'User not found.' });

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, giver } = user;

    return res.status(200).json({
      user: {
        id,
        name,
        email,
        giver,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
