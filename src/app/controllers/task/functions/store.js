// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import Task from '../../../models/Tasks.js';

const storeTask = async (req, res) => {
  const userStoreSchema = Yup.object().shape({
    task: Yup.string().required(),
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

  const { task } = req.body;

  const taskExists = await Task.findOne({ where: { task } });
  if (taskExists) {
    return res.status(400).json({
      error: `Validation failed.`,
      messages: [`Task already exists (${task})`],
    });
  }

  const taskCreated = await Task.create({
    user_id: req.userId,
    task,
  });

  return res.status(201).json(taskCreated);
};

export default storeTask;
