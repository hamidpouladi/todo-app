export type DraggingItem = {
  type: "Card";
  sourceColumn: "todo" | "doing" | "completed";
  index: number;
  taskId: string;
};

//State types
export type Task = {
  _id: string;
  title: string;
  status: "todo" | "doing" | "completed";
};

export type TaskList = {
  todo: Task[];
  doing: Task[];
  completed: Task[];
};
