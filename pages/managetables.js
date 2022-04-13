import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Addtable from "../components/Addtable";
import { getTables, deleteTable } from "../Connection/Table";
import { ToastContainer, toast } from "react-toastify";
import Edittable from "../components/Edittable";
import { useAuth } from "../Context/Auth-context";
import Router from "next/router";

export default function Managetebles() {
  const [tables, setTables] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  const { loggedIn, loggedinUser, handleLogout } = useAuth();

  React.useEffect(() => {
    if (loggedIn === false || loggedinUser?.role !== "admin") {
      console.log("i am running");
      Router.push("/");
      toast.error("You Dont Have Permission", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const fetchTables = async () => {
      let res = await getTables();
      console.log(res);
      if (res.data.success) {
        setTables(res.data.tables);
      }
    };

    fetchTables();
    setUpdate(false);
  }, [update === true]);

  const handleUpdate = (status) => {
    if (status) {
      setUpdate(true);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);

    let res = await deleteTable({ id });
    console.log(res);
    if (res?.data.success) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleUpdate(true);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <h2>
          Manage Your Tables <span className="text-danger">.</span>
        </h2>
        <div className="mt-4">
          <div className="w-100 text-right my-3">
            <Addtable handleUpdate={handleUpdate} />
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Table Number</TableCell>
                  <TableCell align="right">Table Status</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tables &&
                  tables.map((table) => {
                    return (
                      <TableRow
                        // key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {table.tableNumber}
                        </TableCell>
                        <TableCell align="right">{table.tableStatus}</TableCell>
                        <TableCell align="right">
                          <Edittable handleUpdate={handleUpdate} data={table} />
                        </TableCell>
                        <TableCell align="right">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(table._id)}
                          >
                            Delete <i class="far fa-trash-alt"></i>
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
