import express from "express";
import { getAllTasks, createTask, toggleTaskStatus, deleteTask } from "../controllers/tasks";

const tasksRoutes = express.Router();

tasksRoutes.get("/", getAllTasks);
tasksRoutes.post("/", createTask);
tasksRoutes.patch("/:id", toggleTaskStatus);
tasksRoutes.delete("/:id", deleteTask);

export default tasksRoutes;