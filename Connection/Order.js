import axios from "axios";

// let url = "http://localhost:3001";
let url = "https://easydinebackend.herokuapp.com";

const placeOrderWithUser = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/order/placeorderwithuser`, data);
  console.log(res);
  return res;
};

const placeOrderWithoutUser = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/order/placeorderwithoutuser`, data);
  console.log(res);
  return res;
};

const getOrders = async () => {
  let res;
  res = await axios.get(`${url}/api/order/getorders`);
  console.log(res);
  return res;
};

const updateOrderStatus = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/order/updateorderstatus`, data);
  console.log(res);
  return res;
};

const getUserOrders = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/order/getuserorders`, data);
  console.log(res);
  return res;
};

const submitReview = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/order/submitreview`, data);
  console.log(res);
  return res;
};

const getReviewsData = async () => {
  let res;
  res = await axios.get(`${url}/api/order/getreviews`);
  console.log(res);
  return res;
};

export {
  placeOrderWithUser,
  placeOrderWithoutUser,
  getOrders,
  updateOrderStatus,
  getUserOrders,
  submitReview,
  getReviewsData,
};
