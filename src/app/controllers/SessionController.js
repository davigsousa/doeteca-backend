const axios = require('axios').default;
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');
const User = require('../models/User');

class SessionController {
  async store(req, res) {
    const { socialtoken } = req.headers;
    const { by } = req.query;
    const { name, email } = req.body;

    if (!socialtoken || !email) return res.status(400).json({ error: 'Validation fails.' });

    const path = by && by === 'facebook'
      ? `https://graph.facebook.com/me?access_token=${socialtoken}`
      : `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${socialtoken}`;

    try {
      await axios.get(path);
    } catch (err) {
      return res.status(403).json({ error: 'Access Forbiden.' });
    }

    try {
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
