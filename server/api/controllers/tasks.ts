import { Request, Response, NextFunction } from "express";
import Task from "../models/task";
import messages from "../utils/messages";
const { fillCorrectlyMsg, validIdMsg, notFoundMsg } = messages;

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  const task = { title, description };

  if (title && description) {
    try {
      const newTask = await Task.create({ ...task, status: 0 });
      await newTask.save();
      return res.status(201).json({ _id: newTask._id });
    } catch (err) {
      next(err);
    }
  } else {
    next(fillCorrectlyMsg);
  }
};

const toggleTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (id) {
    try {
      const task = await Task.findOne({ _id: id });

      if (task) {
        await Task.updateOne({ _id: id }, { status: task.status === 0 ? 1 : 0 });
        res.status(200).json({ message: "Status updated successfully" });
      } else {
        next(`Task ${notFoundMsg}`);
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(validIdMsg);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (id) {
    try {
      const task = await Task.findOne({ _id: id });

      if (task) {
        await Task.deleteOne({ _id: id });
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        next(`Task ${notFoundMsg}`);
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(validIdMsg);
  }
};

export { getAllTasks, createTask, toggleTaskStatus, deleteTask };