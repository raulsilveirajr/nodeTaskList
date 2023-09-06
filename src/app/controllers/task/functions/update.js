// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import Task from '../../../models/Tasks.js';

const update = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const userUpdateSchema = Yup.object().shape({
    id: Yup.number(),
    task: Yup.string(),
    done: Yup.boolean(),
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

  const taskToUpdate = await Task.findByPk(id);
  if (!taskToUpdate) {
    return res.status(404).json({
      error: `Validation failed.`,
      messages: [`Task not found (${id})`],
    });
  }

  if (task) {
    const taskExists = await Task.findOne({ where: { task } });
    if (taskExists && taskExists.id !== parseInt(id, 10)) {
      return res.status(400).json({
        error: `Validation failed.`,
        messages: [`Task already exists (${task})`],
      });
    }
  }

  await taskToUpdate.update(req.body);

  return res.status(200).json(taskToUpdate);
};

export default update;
