const axios = require('axios').default;
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');
const User = require('../models/User');

class SessionController {
  async store(req, res) {
    const { facebooktoken } = req.headers;
    const { email } = req.body;

    if (!facebooktoken || !email) return res.status(400).json({ error: 'Validation fails.' });

    const path = `https://graph.facebook.com/me?access_token=${facebooktoken}`;
    try {
      const response = await axios.get(path);
      const { name } = response.data;

      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create({
          name, email,
        });
      }

      const { id } = user;

      return res.status(200).json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      return res.status(403).json({ error: 'Acess Forbiden.' });
    }
  }
}

module.exports = new SessionController();
