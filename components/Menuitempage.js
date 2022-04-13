import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Carousal from "./Carousal";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { useBucket } from "../Context/Bucket-context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Menuitempage({ data }) {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [image, setImage] = React.useState([
    "https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFuY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  ]);
  const { bucketItemCount, handleAddToBucket } = useBucket();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    handleAddToBucket(data, quantity);
    handleClose();
  };

  const handleQuantity = (val) => {
    console.log(val);
    if (val === 1) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <button class="btn btn-danger my-3" onClick={handleClickOpen}>
        View Item
      </button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative" }}
          className="mb-3 "
          style={{ backgroundColor: "#E6034D" }}
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
              {data.itemName}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              
            </Button> */}
            <button className="btn btn-warning" onClick={handleAdd}>
              Add To Bucket <i class="fas fa-shopping-basket"></i>
            </button>
          </Toolbar>
        </AppBar>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <div>
                  {data?.images && <Carousal image={data?.images} />}
                  <div className="mt-4">
                    <div className="d-flex justify-content-between">
                      <h3 className="">{data.itemName}</h3>
                      <div className="d-flex ">
                        <button
                          onClick={() => handleQuantity(1)}
                          className="btn-sm btn-danger mx-2"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                        <h5>{quantity}</h5>
                        <button
                          onClick={() => handleQuantity(-1)}
                          className="btn-sm btn-danger mx-2"
                          disabled={quantity <= 1 ? true : false}
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                      </div>
                    </div>

                    <hr
                      className="mt-5"
                      style={{ backgroundColor: "#E6034D" }}
                    />
                    <h3>Description</h3>
                    <p className="mb-5">{data?.description}</p>
                    <hr style={{ backgroundColor: "#E6034D" }} />
                    <h4 className="mb-5">Price : {data.price}</h4>
                    <hr style={{ backgroundColor: "#E6034D" }} />
                    <h3>Ingredients</h3>
                    <p className="mb-5">{data.ingredients}</p>
                    <hr style={{ backgroundColor: "#E6034D" }} />
                    <h3>Neutritons</h3>
                    {data.ingredients.split(",").map(function (ingredient) {
                      return (
                        <p className="mb-5">
                          <i class="fas fa-caret-right"></i>
                          {ingredient}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-center">
                <div>
                  <div
                    style={{
                      height: "300px",
                      width: "350px",
                      border: "1px solid #E6034D",
                      borderRadius: "12px",
                    }}
                    className="text-center"
                  >
                    <div>
                      <img
                        className="img-fluid"
                        src="/static/images/Capture.PNG"
                        style={{ borderRadius: "12px" }}
                      />
                    </div>
                    <button className="btn btn-primary mt-3">
                      <ViewInArIcon /> Experience Dish in AR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
