import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Loading from "./Loading";
import TasksColumn from "./TaskColumn";
import AddTaskModal from "./AddTaskModal";
import { TasksState } from "../reducers/taskReducer";
import { loadTasksAction, addNewTaskAction } from "../actions/taskActions";

function Board() {
  const [toggleModal, setToggleModal] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState("");
  const { loading, todo, doing, completed } = useSelector<
    TasksState,
    TasksState
  >((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch loadTasks action creator
    dispatch(loadTasksAction());
  }, []);

  if (loading) return <Loading />;
  const handleOpenNewTaskModal = (taskStatus: string) => {
    setNewTaskStatus(taskStatus);
    setToggleModal(true);
  };
  const handleSubmitTask = (taskTitle: string) => {
    setToggleModal(false);
    dispatch(addNewTaskAction(taskTitle, newTaskStatus));
  };
  return (
    <div>
      <Header>Todo List App</Header>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <TasksColumn
              tasks={todo}
              title="Todo"
              status="todo"
              color="#f7ce5b"
              onAddBtnClick={() => handleOpenNewTaskModal("todo")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TasksColumn
              tasks={doing}
              title="Doing"
              status="doing"
              color="#c7e9a0"
              onAddBtnClick={() => handleOpenNewTaskModal("doing")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TasksColumn
              tasks={completed}
              title="Done"
              status="completed"
              color="#a3d9ff"
              onAddBtnClick={() => handleOpenNewTaskModal("completed")}
            />
          </Grid>
        </Grid>
        <AddTaskModal
          isOpen={toggleModal}
          onClose={() => setToggleModal(false)}
          handleSubmitTask={handleSubmitTask}
        />
      </Container>
    </div>
  );
}

export default Board;
