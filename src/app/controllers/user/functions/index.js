import User from '../../../models/Users.js';

const indexUser = async (req, res) => {
  const usersList = await User.findAll({});
  // usersList.map

  res.status(200).send(usersList);
};

export default indexUser;
