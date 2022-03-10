import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

const EditDialog = (props) => {
  const [text, setText] = useState("");
  //   const [date, setDate] = useState(new Date().toISOString());
  //   const [reminder, setReminder] = useState(true);

  const handleEditTask = () => {
    const id = props.selectedTask.id;
    if (text === "") setText(props.selectedTask.text);
    props.onEdit({ id, text });
    props.onClose();
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Input Task Information</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Task content"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={props.selectedTask.text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleEditTask}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDialog;
