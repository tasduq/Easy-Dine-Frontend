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
import { getTables } from "../Connection/Table";
import TableBarOutlinedIcon from "@mui/icons-material/TableBarOutlined";

export default function Selecttable({ handleGetTable }) {
  const [open, setOpen] = React.useState(false);
  const [tables, setTables] = React.useState([]);
  const [selectedTable, setSelectedTable] = React.useState(
    tables ? tables[0] : 1
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const fetchTables = async () => {
      let res = await getTables();
      console.log(res);
      if (res.data.success) {
        setTables(res.data.tables);
      }
    };

    fetchTables();
    // setUpdate(fal / se);
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedTable(event.target.value);
  };

  const handleChooseTable = () => {
    handleGetTable(selectedTable);
    handleClose();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Select Table
      </Button> */}
      <button className="btn-sm btn-primary mx-2" onClick={handleClickOpen}>
        Select Table <TableBarOutlinedIcon />
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose Your Table</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Choose Table first to proceed the Order Placement
          </DialogContentText>
          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Table
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedTable}
                label="Select Your Table"
                onChange={handleChange}
              >
                {tables &&
                  tables.map((table, i) => {
                    return (
                      <MenuItem key={i} value={table.tableNumber}>
                        {table.tableNumber}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChooseTable}>Choose</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
