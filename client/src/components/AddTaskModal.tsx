import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  onClose(): void;
  handleSubmitTask(taskTitle: string): void;
  isOpen: boolean;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  handleSubmitTask,
}: Props) {
  const [newTaskInput, setNewTaskInput] = useState<string>("");

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewTaskInput(event.target.value);
  };

  const onSubmit = () => {
    if (!newTaskInput) return;
    handleSubmitTask(newTaskInput);
    setNewTaskInput("");
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newTask"
            label="Enter your task"
            type="text"
            fullWidth
            color="secondary"
            value={newTaskInput}
            onChange={(event) => handleChangeInput(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="secondary">
            Submit Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
