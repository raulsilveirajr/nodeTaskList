// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import User from '../../../models/Users.js';
import authConfig from '../../../../config/auth.js';

const indexSession = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: `User not found.` });
  }

  if (!user.verifyPassword(password)) {
    return res.status(403).json({ error: `Invalid password.` });
  }

  const { id, name } = user;
  req.userId = id;

  return res.status(200).json({
    user: {
      id,
      email,
      name,
    },
    token: jwt.sign({ id, email }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
  });
};

export default indexSession;
