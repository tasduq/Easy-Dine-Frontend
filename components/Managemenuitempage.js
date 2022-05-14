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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Managemenuitempage({ data }) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState([
    "https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFuY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button class="btn btn-outline-success mx-1" onClick={handleClickOpen}>
        <i class="far fa-eye"></i>
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
              {data?.itemName}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              
            </Button> */}
            <button className="btn btn-warning" onClick={handleClose}>
              Close <i class="fas fa-times"></i>
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
                    <h3 className="mb-5">{data.itemName}</h3>

                    <hr style={{ backgroundColor: "#E6034D" }} />
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
                      <a
                        href="https://tasduq.github.io/LearnXR/start/lecture3_11/"
                        class="button"
                      >
                        <ViewInArIcon /> Experience Dish in AR
                      </a>
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
