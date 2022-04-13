import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Orderdetails from "../components/Orderdetails";
import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import MicrowaveOutlinedIcon from "@mui/icons-material/MicrowaveOutlined";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import {
  getOrders,
  updateOrderStatus,
  getUserOrders,
} from "../Connection/Order";
import Managebucket from "../components/Managebucket";
import Review from "../components/Review";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../Context/Auth-context";
// import Orderdetails from "../components/Orderdetails";

const Manageorders = () => {
  const [orderStatus, setOrderStatus] = React.useState("");
  const [update, setUpdate] = React.useState(false);

  const [orders, setOrders] = React.useState();
  const { loggedIn, loggedinUser, handleLogout } = useAuth();

  React.useEffect(() => {
    const fetchOrders = async () => {
      let res = await getUserOrders({
        id: loggedinUser ? loggedinUser.id : window.localStorage.id,
      });
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
      {orders === undefined && (
        <div className="text-center mt-5">
          {" "}
          <div class="spinner-border text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h5>Loading the Orders</h5>
        </div>
      )}

      {orders?.length === 0 && (
        <div className=" container text-center mt-5">
          <h1 className="text-muted mt-4">
            Your Dont Have Any Orders Yet <i class="fas fa-shopping-basket"></i>
          </h1>
        </div>
      )}

      {orders?.length >= 1 && (
        <div className="container mt-5">
          <h2>
            Your Orders <span className="text-danger">.</span>
          </h2>
          <div className="mt-4">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order Number</TableCell>
                    <TableCell align="center">Order Table</TableCell>
                    <TableCell align="left">Order Status</TableCell>

                    <TableCell align="center">Order Date</TableCell>
                    <TableCell align="center">Order Amount</TableCell>
                    <TableCell align="center">Payment Status</TableCell>
                    <TableCell align="center">Order Details</TableCell>
                    <TableCell align="center">Review</TableCell>
                    {/* <TableCell align="right">Update Order</TableCell> */}
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
                          <TableCell align="right">
                            {order.orderTable}
                          </TableCell>
                          <TableCell align="right">
                            <div className="d-flex">
                              {order.orderStatus === 10 ? (
                                <i class="fas fa-receipt mx-2 mt-1 text-danger"></i>
                              ) : "" || order.orderStatus === 20 ? (
                                <OutdoorGrillOutlinedIcon className=" text-danger" />
                              ) : "" || order.orderStatus === 30 ? (
                                <MicrowaveOutlinedIcon className="text-danger" />
                              ) : "" || order.orderStatus === 40 ? (
                                <TableRestaurantIcon className="text-danger" />
                              ) : (
                                ""
                              )}
                              {order.orderStatus === 10
                                ? "Recieved"
                                : "" || order.orderStatus === 20
                                ? "UnderCook"
                                : "" || order.orderStatus === 30
                                ? "Getting Ready"
                                : "" || order.orderStatus === 40
                                ? "Served"
                                : ""}
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {
                              new Date(order.createdAt)
                                .toISOString()
                                .split("T")[0]
                            }
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
                            <Orderdetails data={order.orderItems} />
                          </TableCell>
                          <TableCell align="right">
                            {/* <Orderdetails /> */}
                            <Review disableStatus={order.orderStatus} />
                          </TableCell>
                          {/* <TableCell align="right">
                          
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
                            </Select>
                          </FormControl>
                        </TableCell> */}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manageorders;
