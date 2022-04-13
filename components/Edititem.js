import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Imageupload from "../components/Imageupload";
import { useState } from "react";
import { editItem } from "../Connection/Menu";
import { ToastContainer, toast } from "react-toastify";

const edititem = ({ handleUpdate, data, menuId, sectionId }) => {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = useState(true);
  const [values, setValues] = useState({
    itemName: data.itemName,
    description: data.description,
    images: data.images,
    price: data.price,
    ingredients: data.ingredients,
    hotSelling: data.hotSelling,
    sectionId,
    menuId,
    itemId: data.id,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedImages = (imgs) => {
    console.log(imgs);

    setValues({ ...values, images: imgs });
    // setCarryOnDisabled(false);
  };

  const handleChangeChecked = (evt) => {
    let value = JSON.parse(evt.target.value);
    // console.log(!value);
    setChecked(!value);
    handleChecked();
  };

  const handleChecked = () => {
    console.log(checked);
    setValues({ ...values, hotSelling: checked });
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
    let res = await editItem(values);
    console.log(res);
    if (res?.data.success) {
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
    <div>
      <button className="btn btn-outline-primary" onClick={handleClickOpen}>
        <i class="far fa-edit"></i>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Menu Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the Title and Description for your Menu Item which represents
            your Speciality Best
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Enter a Item Name"
            type="text"
            fullWidth
            variant="standard"
            name="itemName"
            value={values.itemName}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            // autoFocus
            margin="dense"
            id="desciption"
            label="Enter a Description For the Item"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={6}
            // style={{ borderColor: "orange" }}
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <br />
          <br />
          <Imageupload
            selectedImages={handleSelectedImages}
            images={data.images}
          />
          <br />
          <br />
          <TextField
            margin="dense"
            id="title"
            label="Enter the Item Price"
            type="number"
            fullWidth
            variant="standard"
            // color="secondary"
            name="price"
            value={values.price}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            // autoFocus
            margin="dense"
            id="desciption"
            label="Enter a Ingredients of the Item and make the seprated by commas"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            color="secondary"
            name="ingredients"
            value={values.ingredients}
            onChange={handleChange}
          />
          <br />
          <br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value={checked}
              name="hotSelling"
              onChange={handleChangeChecked}
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Make it a hot selling item?
            </label>
          </div>
          <br />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <button class="btn btn-outline-danger" onClick={handleSubmit}>
            Edit Menu Item
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default edititem;
