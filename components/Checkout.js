import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useAuth } from "../Context/Auth-context";
import { placeOrderWithUser, placeOrderWithoutUser } from "../Connection/Order";
import { useBucket } from "../Context/Bucket-context";
import { ToastContainer, toast } from "react-toastify";
import Router from "next/router";

const Checkout = ({ itemsInBucket, bucketTotal, table, handleClose }) => {
  const { loggedIn, loggedinUser, handleLogout } = useAuth();
  const { setItemsInBucket, setBucketItemCount, setBucketTotal } = useBucket();
  console.log(loggedinUser);
  const tokenHandler = async (token) => {
    console.log(token);
    if (loggedIn) {
      let res = await placeOrderWithUser({
        token: token,
        orderTotal: bucketTotal,
        user: loggedinUser,
        itemsInBucket,
        tableNumber: table,
      });
      console.log(res);
      if (res?.data.success) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleClose();
        setItemsInBucket([]);
        setBucketTotal(0);
        setBucketItemCount(0);
        Router.push("/orders");
        // handleUpdate(true);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      let res = await placeOrderWithoutUser({
        token: token,
        orderTotal: bucketTotal,
        // user: loggedinUser,
        itemsInBucket,
        tableNumber: table,
      });
      console.log(res);
      if (res?.data.success) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleClose();
        setItemsInBucket([]);
        setBucketTotal(0);
        setBucketItemCount(0);
        Router.push("/");
        // handleUpdate(true);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  return (
    <StripeCheckout
      amount={bucketTotal * 100}
      shippingAddress
      token={tokenHandler}
      stripeKey="pk_test_51KJeACGTujXHwRwSvzBMhb5YsRr7qy6ADbBBoFv7UZJZSumR1CUAJzlPZAd6RpppjftYwHR7ZPogS3ePHGYQcvho00mQAvtn1K"
      currency="USD"
    >
      <button
        className="btn-sm btn-warning"
        disabled={itemsInBucket?.length <= 0 ? true : false}
      >
        Place Order <i class="far fa-credit-card"></i>
      </button>
    </StripeCheckout>
  );
};

export default Checkout;
