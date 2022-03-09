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

const AddDialog = (props) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date().toString());
  const [reminder, setReminder] = useState(true);

  const handleAddTask = () => {
    props.onAdd({ text, date, reminder });
    props.onClose();
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Add Task</DialogTitle>
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
            onChange={(e) => setText(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={reminder}
                onChange={(e) => setReminder(!reminder)}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Reminder"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDialog;
