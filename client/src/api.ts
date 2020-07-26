// Get all tasks
export async function getTasks<T>(): Promise<T[]> {
  const response = await fetch("http://localhost:5001/api/todos");
  const data = await response.json();
  return data;
}
// Edit task by id
export async function editTask<T>(taskId: string, status: string): Promise<T> {
  const response = await fetch(`http://localhost:5001/api/todos/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  const data = response.json();
  return data;
}

// Add new task
export async function addTask<T>(title: string, status: string): Promise<T> {
  const response = await fetch("http://localhost:5001/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, status }),
  });
  const data = response.json();
  return data;
}
