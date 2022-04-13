import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../Context/Auth-context";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState();
  const [totalUsers, setTotalUsers] = useState();
  const [todayOrders, setTodayOrders] = useState();
  const [tables, setTables] = useState();
  const [ordersTotal, setOrdersTotal] = useState();
  const { loggedIn, loggedinUser, handleLogout } = useAuth();

  useEffect(() => {
    // const fetchUsers = async () => {
    //   let res = await getTotalUsers();
    //   console.log(res);
    //   setTotalUsers(res.data.users);
    // };
    // fetchUsers();
    console.log(loggedinUser?.role);

    if (loggedIn === false || loggedinUser?.role !== "admin") {
      console.log("i am running");
      Router.push("/");
      toast.error("You Dont Have Permission", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);

  return (
    <div>
      <div>
        <div className="container mt-5">
          <h2>
            Managment Dashboard <span className="text-danger">.</span>
          </h2>
          <div className="row">
            <div className="col-12 col-md-4  my-3">
              <div className="card shadow-sm" style={{ width: "18 rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1568031813264-d394c5d474b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                  className="card-img-top "
                  alt="..."
                />
                <div className="card-body" style={{ height: "202px" }}>
                  <h5 className="card-title">Manage Menu</h5>
                  <p className="card-text" style={{ height: "72px" }}>
                    Create and Customize the Menu Here
                  </p>
                  <a className="btn btn-danger">
                    <Link style={{ textDecoration: "none" }} href="/managemenu">
                      Go To Menu
                    </Link>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4  my-3">
              <div className="card shadow-sm" style={{ width: "18 rem" }}>
                <img
                  src="https://media.istockphoto.com/photos/online-food-delivery-mobile-app-shown-on-smart-phone-screen-hold-by-picture-id1300640747?b=1&k=20&m=1300640747&s=170667a&w=0&h=R2k_y4wHg7FoIAwHcSH1l1IIJfv55w_F1sQccLh8m7c=                                              "
                  className="card-img-top img-fluid "
                  //   style={{ height: "138px" }}
                  alt="..."
                />
                <div className="card-body" style={{ height: "202px" }}>
                  <h5 className="card-title">Manage Orders</h5>
                  <p className="card-text" style={{ height: "72px" }}>
                    You can manage your orders there
                  </p>
                  <a href="#" className="btn btn-warning">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/manageorders"
                    >
                      Go To Orders
                    </Link>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4  my-3">
              <div className="card shadow-sm" style={{ width: "18 rem" }}>
                <img
                  src="https://cdn.pixabay.com/photo/2015/05/31/11/23/table-791167__340.jpg"
                  className="card-img-top"
                  //   style={{ height: "138px" }}
                  alt="..."
                />
                <div className="card-body" style={{ height: "202px" }}>
                  <h5 className="card-title">Manage Tables</h5>
                  <p className="card-text" style={{ height: "72px" }}>
                    Create and Manage Tables Here
                  </p>
                  <a className="btn btn-danger">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/managetables"
                    >
                      Go To Tables
                    </Link>
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="col-12 col-md-4 col-lg-3 my-3">
              <div className="card shadow-sm" style={{ width: "18 rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGF5bWVudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                  className="card-img-top"
                  alt="..."
                  //   style={{ height: "138px" }}
                />
                <div className="card-body" style={{ height: "202px" }}>
                  <h5 className="card-title">Manage Payments</h5>
                  <p className="card-text" style={{ height: "72px" }}>
                    Manage Payments Here
                  </p>
                  <a href="#" className="btn btn-warning">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/managepayments"
                    >
                      Go To Payments
                    </Link>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
