import Task from '../../../models/Tasks.js';

const remove = async (req, res) => {
  const { id } = req.params;

  const taskToDelete = await Task.findByPk(id);
  if (!taskToDelete) {
    return res.status(404).json({
      error: `Validation failed.`,
      messages: [`Task not found (${id})`],
    });
  }

  if (taskToDelete.user_id !== req.userId) {
    return res.status(401).json({
      error: `Validation failed.`,
      messages: [`Request not allowed for this id (${id})`],
    });
  }

  await taskToDelete.destroy();
  return res.send();
};

export default remove;
