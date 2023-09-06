import Task from '../../../models/Tasks.js';

const indexTask = async (req, res) => {
  const tasksList = await Task.findAll({
    where: { user_id: req.userId, done: false },
  });

  return res.status(200).send(tasksList);
};

export default indexTask;
