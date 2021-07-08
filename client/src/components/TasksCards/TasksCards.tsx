import React from "react";
import { Task } from "../../interfaces/interfaces";
import { Grid, Card, CardActions, CardContent, Typography, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { toggleTaskStatus, deleteTask } from "../../services/tasks";
import "./TasksCards.scss";

interface Props {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const TasksCards: React.FC<Props> = ({ tasks, setTasks }) => {
  const toggleStatus = async (id: string, index: number) => {
    const res = await toggleTaskStatus(id);

    if (res.success) {
      const newArr = [...tasks];
      newArr[index].status = newArr[index].status === 0 ? 1 : 0;
      setTasks(newArr);
    }
  };

  const isCompleted = (index: number) => tasks[index].status === 1;

  const removeTask = async (id: string, index: number) => {
    const res = await deleteTask(id);

    if (res.success) {
      const newArr = [...tasks];
      newArr.splice(index, 1);
      setTasks(newArr);
    }
  };

  return (
    <Grid className="tasks-cards" container justify="center" spacing={2}>
      {tasks.map((task: Task, index: number) => (
        <Grid key={index} item xs={10} sm={8} md={6} className="task">
          <Card className={"card" + (isCompleted(index) ? " is-completed" : "")} elevation={6}>
            <CardContent className="card-content">
              <Typography>{task.title}</Typography>
              <Typography className="task-description"> {task.description}</Typography>
            </CardContent>
            <CardActions className="card-actions">
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={isCompleted(index)}
                    onChange={() => task._id && toggleStatus(task._id, index)}
                    inputProps={{ "aria-label": "checkbox" }}
                  />
                }
                label={isCompleted(index) ? "undone" : "done"}
              />
              <Button onClick={() => task._id && removeTask(task._id, index)}>Delete Task</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TasksCards;