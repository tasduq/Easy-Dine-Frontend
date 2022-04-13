import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { addMenu } from "../Connection/Menu";
import { ToastContainer, toast } from "react-toastify";

export default function Addmenu({ handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    title: "",
    description: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({
      title: "",
      description: "",
    });
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(values);
    let res = await addMenu(values);
    console.log(res);
    if (res.data.success) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleUpdate(true);
      handleClose();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="px-5">
      <button class="btn btn-outline-danger" onClick={handleClickOpen}>
        Add Menu
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Menu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the Title and Description for your Menu which represents your
            Speciality Best
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Enter a Title"
            type="text"
            fullWidth
            variant="standard"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            margin="dense"
            id="desciption"
            label="Enter a Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <button class="btn btn-outline-danger" onClick={handleSubmit}>
            Add Menu
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
