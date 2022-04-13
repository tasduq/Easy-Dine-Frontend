import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { addSection } from "../Connection/Menu";
import { ToastContainer, toast } from "react-toastify";

export default function Addsection({ handleUpdate, menuId }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    menuId,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({
      title: "",
      description: "",
      menuId,
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
    let res = await addSection(values);
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
    <div className="">
      <button class="btn btn-outline-danger" onClick={handleClickOpen}>
        Add Section
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the Section to your Menu which would decribe best the Category
            of the Items
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Enter a Title for this Section"
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
            // autoFocus
            margin="dense"
            id="desciption"
            label="Enter a Description for this Section"
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
            Add Section
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
