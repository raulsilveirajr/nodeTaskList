// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import User from '../../../models/Users.js';

const updateUser = async (req, res) => {
  const { email, oldPassword } = req.body;

  const userUpdateSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    oldPassword: Yup.string().required().min(6),
    password: Yup.string()
      .required()
      .min(6)
      .when('oldPassword', (oldPasswordTmp, field) =>
        oldPasswordTmp ? field.required() : field
      ),
    confirmPassword: Yup.string().when('password', (passwordTmp, field) =>
      passwordTmp ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });

  let errorMessages = [];
  await userUpdateSchema
    .validate(req.body, { abortEarly: false })
    .catch((err) => {
      errorMessages = err.errors;
    });

  if (errorMessages.length > 0) {
    return res
      .status(400)
      .json({ error: `Validation failed.`, messages: errorMessages });
  }

  const user = await User.findByPk(req.userId);
  if (!user) {
    return res.status(404).json({
      error: `Validation failed.`,
      messages: [`User not found (${req.userId})`],
    });
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists && userExists.id !== req.userId) {
    return res.status(400).json({
      error: `Validation failed.`,
      messages: [`E-mail already exists (${req.body.email})`],
    });
  }

  if (oldPassword && !(await user.verifyPassword(oldPassword))) {
    return res.status(400).json({
      error: `Validation failed.`,
      messages: [`Current password wrong.`],
    });
  }

  const { id, name } = await user.update(req.body);

  return res.status(200).json({ id, name, email });
};

export default updateUser;
