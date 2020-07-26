import { Dispatch } from "redux";
import {
  Task,
  TaskActionTypes,
  LOAD_TASKS_BEGIN,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_ERROR,
  MOVE_TASK_SUCCESS,
  MOVE_TASK_ERROR,
  DragedTask,
  ADD_NEW_TASK_SUCCESS,
  ADD_NEW_TASK_ERROR,
} from "./taskActionTypes";
import { getTasks, editTask, addTask } from "../api";

export const loadTasksAction = () => async (
  dispatch: Dispatch<TaskActionTypes>
) => {
  dispatch({ type: LOAD_TASKS_BEGIN });
  try {
    const tasks = await getTasks<Task>();
    dispatch({ type: LOAD_TASKS_SUCCESS, payload: tasks });
  } catch (error) {
    dispatch({ type: LOAD_TASKS_ERROR, error });
  }
};

export const moveTaskAction = (task: DragedTask) => async (
  dispatch: Dispatch<TaskActionTypes>
) => {
  try {
    //Optimistic update State
    dispatch({ type: MOVE_TASK_SUCCESS, payload: task });
    const res = editTask<Task>(task.taskId, task.targetColumn);
  } catch (error) {
    dispatch({ type: MOVE_TASK_ERROR, error: error });
  }
};

export const addNewTaskAction = (title: string, status: string) => async (
  dispatch: Dispatch<TaskActionTypes>
) => {
  try {
    const data = await addTask<Task>(title, status);
    dispatch({ type: ADD_NEW_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_NEW_TASK_ERROR, error: error });
  }
};
