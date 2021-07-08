import React, { useEffect, useState } from "react";
import { getAllTasks } from "../../services/tasks";
import { Button, Typography } from "@material-ui/core";
import TasksCards from "../TasksCards/TasksCards";
import TasksForm from "../TasksForm/TasksForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./TasksContainer.scss";

const TasksContainer = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("TasksContainer")
    const getTasks = async () => {
      const res = await getAllTasks();

      if (res.success) {
        setTasks(res.data);
      } else {
        setError("Something went wrong...");
      }
    };

    getTasks();
  }, []);

  return (
    <div className="tasks-container">
      <Typography component="h1">Tasks App</Typography>
      <Button className="add-task" onClick={() => setIsFormOpened(true)}>Add Task</Button>
      <TasksForm isOpened={isFormOpened} setIsOpened={setIsFormOpened} setTasks={setTasks} setError={setError} />
      <TasksCards tasks={tasks} setTasks={setTasks} />
      <ErrorMessage error={error} setError={setError} />
    </div>
  );
};

export default TasksContainer;