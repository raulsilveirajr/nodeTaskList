// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import User from '../../../models/Users.js';

const storeUser = async (req, res) => {
  const userStoreSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
  });

  let errorMessages = [];
  await userStoreSchema
    .validate(req.body, { abortEarly: false })
    .catch((err) => {
      errorMessages = err.errors;
    });

  if (errorMessages.length > 0) {
    return res
      .status(400)
      .json({ error: `Validation failed.`, messages: errorMessages });
  }

  const userExists = await User.findOne({ where: { email: req.body.email } });
  if (userExists) {
    return res.status(400).json({
      error: `Validation failed.`,
      messages: [`E-mail already exists (${req.body.email})`],
    });
  }

  const { id, name, email } = await User.create(req.body);
  return res.status(201).json({ id, name, email });
};

export default storeUser;
