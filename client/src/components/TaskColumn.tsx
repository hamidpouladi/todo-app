import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Card from "./Card";
import ColumnHeader from "./ColumnHeader";
import { Task } from "../actions/taskActionTypes";
import { moveTaskAction } from "../actions/taskActions";
import { DraggingItem } from "../types";

interface Props {
  tasks: Task[];
  title: string;
  status: "todo" | "doing" | "completed";
  color: string;
  onAddBtnClick: () => void;
}

const TasksColumn: React.FC<Props> = ({
  tasks,
  title,
  status,
  color,
  onAddBtnClick,
}) => {
  //Store Tasks props data to allTask state
  const [allTask, setAllTask] = useState(tasks);
  //user search input
  const [searchInput, setSearchInput] = useState("");
  const allTaskRef = useRef(tasks);

  //update allTask state
  useEffect(() => {
    allTaskRef.current = tasks;
    setAllTask(tasks);
  }, [tasks]);

  //Get redux dispath Method from react-redux useDispatch hook
  const dispatch = useDispatch();
  // React-dnd useDrop hook
  const [{ isOver }, drop] = useDrop({
    accept: "Card",
    drop: (item: DraggingItem) => {
      const { index, taskId, sourceColumn } = item;
      // dispatch action affter dropping card
      dispatch(
        moveTaskAction({ index, taskId, sourceColumn, targetColumn: status })
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  //handle user search
  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchInput(event.target.value);
  };

  //handle user search
  useEffect(() => {
    const str = searchInput.toLowerCase();
    const result = allTask.filter((item) =>
      item.title.toLowerCase().includes(str)
    );
    console.log(result, "result");
    if (result.length > 0 && str.length > 0) {
      setAllTask(result);
    } else {
      setAllTask(allTaskRef.current);
    }
  }, [searchInput]);

  const styles = {
    marginTop: "5px",
    backgroundColor: isOver ? "#fcf0cd" : "#FFF",
    minHeight: "350px",
  };
  return (
    <div>
      <ColumnHeader color={color}>{title}</ColumnHeader>
      <TextField
        id="search"
        label="Search"
        color="secondary"
        fullWidth
        onChange={(event) => handleSearch(event)}
      />
      <div ref={drop} style={{ ...styles }}>
        {allTask.length > 0
          ? allTask.map((task, index) => (
              <Card
                key={task._id}
                text={task.title}
                index={index}
                status={status}
                id={task._id}
              />
            ))
          : null}
      </div>
      <Button
        color="inherit"
        variant="outlined"
        size="small"
        startIcon={<AddIcon />}
        fullWidth
        onClick={onAddBtnClick}
      >
        Add New Card
      </Button>
    </div>
  );
};

export default TasksColumn;
