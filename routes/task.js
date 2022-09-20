const express = require('express');
const {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require('../controller/task');
const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router;
