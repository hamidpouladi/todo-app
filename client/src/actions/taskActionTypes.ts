export const LOAD_TASKS_BEGIN = "LOAD_TASKS_BEGIN";
export const LOAD_TASKS_SUCCESS = "LOAD_TASKS_SUCCESS";
export const LOAD_TASKS_ERROR = "LOAD_TASKS_ERROR";
export const MOVE_TASK_SUCCESS = "MOVE_TASK_SUCCESS";
export const MOVE_TASK_ERROR = "MOVE_TASK_ERROR";
export const ADD_NEW_TASK_SUCCESS = "ADD_NEW_TASK_SUCCESS";
export const ADD_NEW_TASK_ERROR = "ADD_NEW_TASK_ERROR";

export type DragedTask = {
  index: number;
  sourceColumn: "todo" | "doing" | "completed";
  targetColumn: "todo" | "doing" | "completed";
  taskId: string;
};

export type Task = {
  _id: string;
  title: string;
  status: "todo" | "doing" | "completed";
};

interface LoadTasksBegin {
  type: typeof LOAD_TASKS_BEGIN;
}

interface LoadTasksSuccess {
  type: typeof LOAD_TASKS_SUCCESS;
  payload: Task[];
}

interface LoadTasksError {
  type: typeof LOAD_TASKS_ERROR;
  error: string;
}

interface MoveTaskSuccess {
  type: typeof MOVE_TASK_SUCCESS;
  payload: DragedTask;
}
interface MoveTaskError {
  type: typeof MOVE_TASK_ERROR;
  error: string;
}

interface AddNewTaskSuccess {
  type: typeof ADD_NEW_TASK_SUCCESS;
  payload: Task;
}
interface AddNewTaskError {
  type: typeof ADD_NEW_TASK_ERROR;
  error: string;
}

export type TaskActionTypes =
  | LoadTasksBegin
  | LoadTasksSuccess
  | LoadTasksError
  | MoveTaskSuccess
  | MoveTaskError
  | AddNewTaskSuccess
  | AddNewTaskError;
