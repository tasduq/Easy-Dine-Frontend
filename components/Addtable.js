import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addTable } from "../Connection/Table";
import { ToastContainer, toast } from "react-toastify";

export default function Addmenu({ handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [tableNumber, setTableNumber] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tableStatus, setTableStatus] = React.useState("Table Status");

  const handleTableStatus = (event) => {
    setTableStatus(event.target.value);
  };
  const handleTableNumber = (event) => {
    console.log(event.target.value);
    setTableNumber(event.target.value);
  };

  const handleSubmit = async () => {
    // console.log(values);
    let res = await addTable({
      tableNumber,
      tableStatus,
    });
    console.log(res);
    if (res?.data.success) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTableNumber("");
      setTableStatus("Table Status");
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
      <button className="btn btn-success" onClick={handleClickOpen}>
        Add Table
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Table</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the Number and Description for your tables so you would be able
            to Reserve it in Advance and get to know about the table from which
            you received the order
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="tableNumber"
            label="Enter a Table Number"
            type="number"
            fullWidth
            variant="standard"
            // name="tableNumber"
            value={tableNumber}
            onChange={handleTableNumber}
          />
          <br />
          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Table Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tableStatus}
                label="Select Table Status"
                onChange={handleTableStatus}
              >
                <MenuItem value="Free">Free</MenuItem>
                <MenuItem value="Reserved">Reserved</MenuItem>
                <MenuItem value="Occupied">Occupied</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <button class="btn btn-outline-danger" onClick={handleSubmit}>
            Add Table
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
