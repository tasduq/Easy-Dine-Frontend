import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StarRatings from "react-star-ratings";
import { submitReview } from "../Connection/Order";
import { ToastContainer, toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ disableStatus }) {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({
    userName: window.localStorage.getItem("username"),
  });
  console.log(window.localStorage.getItem("username"));
  const [reviewData, setReviewData] = React.useState({
    name: window.localStorage.getItem("username"),
    review: "",
    star: 4,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleReviewChange = (evt) => {
    setReviewData({
      ...reviewData,
      review: evt.target.value,
    });
  };

  const handleChangeRating = (newRating, name) => {
    console.log(newRating);
    setReviewData({
      ...reviewData,
      star: newRating,
    });
  };

  const handleSubmit = async () => {
    handleClose();
    let res = await submitReview(reviewData);
    if (res?.data.success) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    console.log(res);
    setReviewData({
      name: window.localStorage.getItem("username"),
      review: "",
      star: 4,
    });
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      {console.log(reviewData)}
      <button
        disabled={disableStatus === 40 ? false : true}
        onClick={handleClickOpen}
        className="btn btn-primary"
      >
        <i class="far fa-comment"></i> Review It
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // fullWidth={true}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", // Set your width here
            },
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Review Your Order
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography className="text-muted" gutterBottom>
            Review Your Order Experience{" "}
          </Typography>
          <br />
          <h5>{userData?.userName}</h5>
          <br />
          <TextField
            id="filled-multiline-static"
            label="Review Description"
            multiline
            rows={4}
            // defaultValue="Default Value"
            variant="filled"
            style={{ width: "100%" }}
            value={reviewData.review}
            onChange={handleReviewChange}
          />
          <br />
          <br />
          <h5>Choose Stars</h5>
          <StarRatings
            rating={reviewData.star}
            starRatedColor="yellow"
            changeRating={handleChangeRating}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
          />
        </DialogContent>
        <DialogActions>
          <button className="btn btn-success" onClick={handleSubmit}>
            Publish Review
          </button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
