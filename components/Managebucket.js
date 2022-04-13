import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Badge from "@mui/material/Badge";
import { useBucket } from "../Context/Bucket-context";
import Managemenuitemcard from "./Managemenuitemcard";
import Checkout from "./Checkout";
import Selecttable from "./Selecttable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Managebucket({ data }) {
  const [open, setOpen] = React.useState(false);
  const [table, setTable] = React.useState("");
  //   const {
  //     bucketItemCount,
  //     itemsInBucket,
  //     handleDeleteFromBucket,
  //     bucketTotal,
  //   } = useBucket();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    handleDeleteFromBucket(id);
  };

  const handleGetTable = (table) => {
    setTable(table);
  };

  return (
    <div>
      {/* <Badge
        onClick={handleClickOpen}
        className="mx-3 mt-3 "
        badgeContent={bucketItemCount}
        color="secondary"
      >
        <i class="fas fa-shopping-basket"></i>
      </Badge> */}

      <button className="btn btn-success" onClick={handleClickOpen}>
        View Order Details <i class="fas fa-sign-in-alt"></i>
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ backgroundColor: "#E6034D" }}
          sx={{ position: "relative" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Bucket <i class="fas fa-shopping-basket"></i>
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
            {/* <button
              className="btn btn-warning"
              disabled={itemsInBucket?.length <= 0 ? true : false}
            >
              Place Order <i class="far fa-credit-card"></i>
            </button> */}
            <div className="d-flex">
              {/* <Selecttable handleGetTable={handleGetTable} /> */}
              {/* {table && (
                <Checkout
                  itemsInBucket={itemsInBucket}
                  bucketTotal={bucketTotal}
                  table={table}
                  handleClose={handleClose}
                />
              )} */}
            </div>
          </Toolbar>
        </AppBar>
        <div>
          <div className="container mt-5">
            <h2 className="text-center">
              Customer Food Order In Bucket{" "}
              <span className="text-danger">.</span>
            </h2>
            <br />
            {/* <div className="d-flex justify-content-between">
              <h2 className="text-center">
                Bucket Total <span className="text-danger">.</span>
              </h2>
              <h5>{bucketTotal} USD</h5>
            </div> */}

            <br />
            {data?.length > 0 &&
              data.map((item) => {
                return (
                  <div className="row my-4">
                    {console.log(item)}
                    <div className="col-12 col-md-8 ">
                      <div>
                        <h4 className="mt-4">{item.itemName}</h4>
                        <div className="d-flex">
                          <h5 className="mr-2">Quantity </h5>{" "}
                          <p style={{ color: "#E6034D" }}> : {item.quantity}</p>
                        </div>
                        {/* <button
                          className="btn btn-danger mb-4"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete <i class="far fa-trash-alt"></i>
                        </button> */}
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <Managemenuitemcard
                        // title={item.itemName}
                        // description={item.description}
                        // price={item.price}
                        // image={item?.images[0]}
                        data={item}
                        // sectionId={data.id}
                        // menuId={menuId}
                        // handleUpdate={handleUpdate}
                      />
                    </div>
                    <hr style={{ backgroundColor: "#E6034D" }} />
                  </div>
                );
              })}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
