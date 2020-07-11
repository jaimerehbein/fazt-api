import { Handler } from '../types';
import Task from '../models/Task';
import { ErrorHandler } from '../error';
import { NOT_FOUND } from 'http-status-codes';

export const getTasks: Handler = async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).json({
    code: 200,
    data: tasks,
    message:'Ok!'
  });
};

export const getTask: Handler = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ErrorHandler(NOT_FOUND, 'Task not found');

  return res.status(200).json({
    code: 200,
    data: task,
    message: 'Ok!'
  });
};

export const createTask: Handler = async (req, res) => {
  const { title, description, date, postingUser } = req.body;
  const task = new Task({ title, description, date, postingUser });
  await task.save();
  return res.status(201).json({
    code: 201,
    data: task,
    message: 'Created!'
  });
};

export const deleteTask: Handler = async (req, res) => {
  const taskDeleted = await Task.findByIdAndDelete(req.params.id);

  if (!taskDeleted) throw new ErrorHandler(NOT_FOUND, 'Task not found');

  return res.status(200).json({
    code: 200,
    data: taskDeleted,
    message: 'Ok!'
  });
};

export const updateTask: Handler = async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) throw new ErrorHandler(NOT_FOUND, 'Task not found');

  task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

  return res.status(200).json({
    code: 200, 
    message: 'Ok!'
  })
};
