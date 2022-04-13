import React, { createContext, useState, useEffect } from "react";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const BucketContext = createContext({});

const BucketProvider = (props) => {
  const [itemsInBucket, setItemsInBucket] = useState([]);
  const [bucketItemCount, setBucketItemCount] = useState(0);
  const [bucketTotal, setBucketTotal] = useState(0);

  // useEffect(() => {
  //   console.log("I am ruuningf");
  //   if (window.localStorage.getItem("bucket")) {
  //     setItemsInBucket(JSON.parse(window.localStorage.getItem("bucket")));
  //     setBucketItemCount(
  //       JSON.parse(window.localStorage.getItem("bucket")).length
  //     );
  //     // handleBucketTotal();
  //   } else {
  //     setItemsInBucket([]);
  //   }
  // }, []);

  const handleAddToBucket = (newItem, quantity) => {
    setItemsInBucket([...itemsInBucket, { ...newItem, quantity }]);
    setBucketItemCount(bucketItemCount + 1);
    let price = +newItem.price;
    let newQuantity = +quantity;
    console.log();
    let total = price * newQuantity;
    setBucketTotal(bucketTotal + total);
    handleBucketToLocal();
  };

  const handleBucketToLocal = () => {
    window.localStorage.setItem("bucket", JSON.stringify(itemsInBucket));
  };

  const handleDeleteFromBucket = (id) => {
    console.log("cliked");
    let quantity, price;
    let updatedBucket = itemsInBucket.filter((item) => {
      console.log(item.quantity);
      if (item.id === id) {
        quantity = +item.quantity;
        price = +item.price;
      }
      return item.id !== id;
    });
    let total = price * quantity;
    setBucketTotal(bucketTotal - total);
    setItemsInBucket(updatedBucket);
    setBucketItemCount(bucketItemCount - 1);
    handleBucketToLocal();
  };

  const bucketContextValue = {
    itemsInBucket,
    setItemsInBucket,
    handleBucketToLocal,
    handleAddToBucket,
    handleDeleteFromBucket,
    bucketItemCount,
    bucketTotal,
    setBucketItemCount,
    setBucketTotal,
  };

  return <BucketContext.Provider value={bucketContextValue} {...props} />;
};

const useBucket = () => React.useContext(BucketContext);

export { BucketProvider, useBucket };
