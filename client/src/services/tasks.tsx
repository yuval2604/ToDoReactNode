import { Task } from "../interfaces/interfaces";

const isProduction = process.env.NODE_ENV === "production";
const url = `${
  isProduction
    ? process.env.REACT_APP_BASE_URL_PRODUCTION
    : process.env.REACT_APP_BASE_URL
}/api/tasks`;

const getAllTasks = async () => {
  console.log(url, process.env.REACT_APP_BASE_URL_PRODUCTION, process.env.REACT_APP_BASE_URL, process.env  )
  const res = await fetch(url);
  return responseHandler(res);
};

const createTask = async (task: Task) => {
  const options = setRestOptions("POST", task);
  const res = await fetch(url, options);
  return responseHandler(res);
};

const toggleTaskStatus = async (id: string) => {
  const options = setRestOptions("PATCH", { id });
  const res = await fetch(`${url}/${id}`, options);
  return responseHandler(res);
};

const deleteTask = async (id: string) => {
  const options = setRestOptions("DELETE", { id });
  const res = await fetch(`${url}/${id}`, options);
  return responseHandler(res);
};

const setRestOptions = (methodType: string, body?: any) => {
  return {
    method: methodType,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
};

const responseHandler = async (serverRes: Response) => {
  let res: any = { success: false };

  try {
    const data = await serverRes.json();

    if (data) {
      res = { success: true, data };
    }
  } catch (err) {}

  return res;
};

export { getAllTasks, createTask, toggleTaskStatus, deleteTask };
