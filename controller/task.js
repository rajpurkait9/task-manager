const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');

// getAllTasks createTask getTask updateTask  deleteTask

const getAllTasks = asyncWrapper(async (req, res) => {
  const allTask = await Task.find({});
  res.status(200).json({ allTask });
});

const createTask = asyncWrapper(async (req, res) => {
  // if (!req.body.name || !req.body.completed) {
  //   return res.status(400).send('bad request ');
  // }
  const newTask = await Task.create(req.body);

  res.status(200).json(newTask);
});

const getTask = asyncWrapper(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('task does not exists with this id');
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const deleteTask = await Task.findByIdAndDelete(req.params.id);
  if (!deleteTask) {
    return res.status(404).send('the task does not exixts with given id');
  }
  res.status(200).json(await Task.find({}));
});

const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json('task does not exists with this id');
  }
  res.status(200).json(task);
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
