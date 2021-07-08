import mongoose from "mongoose";
import { Task as ITask } from "../interfaces/interfaces";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Number, enum: [0, 1], required: true }
});

export default mongoose.model<ITask>("Task", taskSchema);