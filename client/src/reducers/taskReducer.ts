import {
  Task,
  TaskActionTypes,
  LOAD_TASKS_BEGIN,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_ERROR,
  MOVE_TASK_SUCCESS,
  ADD_NEW_TASK_ERROR,
  ADD_NEW_TASK_SUCCESS,
} from "../actions/taskActionTypes";

export interface TaskList {
  todo: Task[];
  doing: Task[];
  completed: Task[];
}

export interface TasksState extends TaskList {
  loading: boolean;
  error: string;
}

const initialState: TasksState = {
  loading: true,
  error: "",
  todo: [],
  doing: [],
  completed: [],
};
export function taskReducer(state = initialState, action: TaskActionTypes) {
  switch (action.type) {
    case LOAD_TASKS_BEGIN:
      return { ...state, loading: true };
    case LOAD_TASKS_SUCCESS:
      const tasks = extractTasks(action.payload);
      return {
        ...state,
        todo: tasks.todo,
        doing: tasks.doing,
        completed: tasks.completed,
        loading: false,
      };
    case LOAD_TASKS_ERROR:
      return state;
    case MOVE_TASK_SUCCESS:
      const cloneState = { ...state };
      const task = action.payload;
      const item = cloneState[task.sourceColumn].splice(task.index, 1)[0];
      cloneState[task.targetColumn].push(item);
      return cloneState;
    case ADD_NEW_TASK_SUCCESS:
      const newState = { ...state };
      newState[action.payload.status].push(action.payload);
      return newState;
    case ADD_NEW_TASK_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

const initialValue: TaskList = {
  todo: [],
  doing: [],
  completed: [],
};
function extractTasks(tasks: Task[]): TaskList {
  return tasks.reduce((acc, task) => {
    if (task.status === "completed") {
      acc.completed.push(task);
      return acc;
    }
    if (task.status === "doing") {
      acc.doing.push(task);
      return acc;
    }
    acc.todo.push(task);
    return acc;
  }, initialValue);
}
