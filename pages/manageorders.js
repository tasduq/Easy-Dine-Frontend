import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Orderdetails from "../components/Orderdetails";
import { getOrders, updateOrderStatus } from "../Connection/Order";
import Managebucket from "../components/Managebucket";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../Context/Auth-context";
import Router from "next/router";

const Manageorders = () => {
  const [orderStatus, setOrderStatus] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  const { loggedIn, loggedinUser, handleLogout } = useAuth();

  const [orders, setOrders] = React.useState([]);

  const handleOrderStatus = async (evt, id) => {
    console.log(evt.target.value, id);
    // setOrderStatus(evt.target.value);
    let res = await updateOrderStatus({ orderStatus: evt.target.value, id });
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

  React.useEffect(() => {
    if (loggedIn === false || loggedinUser?.role !== "admin") {
      console.log("i am running");
      Router.push("/");
      toast.error("You Dont Have Permission", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const fetchOrders = async () => {
      let res = await getOrders();
      console.log(res);
      if (res.data.success) {
        // let formatOrders = res.data.orders.map((order) => {
        //   return {
        //     ...order,
        //     createdAt: new Date(order.createdAt).toString(),
        //   };
        // });
        setOrders(res.data.orders);
      }
    };

    fetchOrders();
    setUpdate(false);
  }, [update === true]);

  const handleUpdate = (status) => {
    if (status) {
      setUpdate(true);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <h2>
          Manage Your Orders <span className="text-danger">.</span>
        </h2>

        <div className="mt-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order Number</TableCell>
                  <TableCell align="right">Order Table</TableCell>
                  <TableCell align="right">Order Status</TableCell>

                  <TableCell align="right">Order Date</TableCell>
                  <TableCell align="right">Order Amount</TableCell>
                  <TableCell align="right">Payment Status</TableCell>
                  <TableCell align="right">Order Details</TableCell>
                  <TableCell align="right">Update Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.map((order) => {
                    return (
                      <TableRow
                        // key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {order.orderNumber}
                        </TableCell>
                        <TableCell align="right">{order.orderTable}</TableCell>
                        <TableCell align="right">
                          {order.orderStatus === 10
                            ? "Recieved"
                            : "" || order.orderStatus === 20
                            ? "UnderCook"
                            : "" || order.orderStatus === 30
                            ? "Getting Ready"
                            : "" || order.orderStatus === 40
                            ? "Served"
                            : ""}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(order.createdAt).toString()}
                        </TableCell>
                        <TableCell align="right">
                          {order.orderAmount} USD
                        </TableCell>
                        <TableCell align="right">
                          {order.paymentStatus
                            ? "Payment Recieved"
                            : "Not Paid"}
                        </TableCell>
                        <TableCell align="right">
                          {/* <Orderdetails /> */}
                          <Managebucket data={order.orderItems} />
                        </TableCell>
                        <TableCell align="right">
                          {/* <button className="btn btn-primary">
                        Update<i class="far fa-edit"></i>
                      </button>
                       */}
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Status
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={order.orderStatus}
                              label="Age"
                              onChange={(evt) =>
                                handleOrderStatus(evt, order._id)
                              }
                            >
                              <MenuItem value={10}>Received</MenuItem>
                              <MenuItem value={20}>Under Cook</MenuItem>
                              <MenuItem value={30}>Getting Ready</MenuItem>
                              <MenuItem value={40}>Served</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {orders.length <= 0 && (
          <div className="text-center mt-5">
            {" "}
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <h5>Loading the Orders</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manageorders;
