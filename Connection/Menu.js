import axios from "axios";

// let url = "http://localhost:3001";
let url = "https://easydinebackend.herokuapp.com";

const getMenu = async () => {
  // console.log(data);
  let res;
  res = await axios.get(`${url}/api/menu/get`);
  console.log(res);
  return res;
};

const addMenu = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/menu/addmenu`, data);
  console.log(res);
  return res;
};

const addSection = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/menu/addsection`, data);
  console.log(res);
  return res;
};

const deleteSection = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/menu/deletesection`, data);
  console.log(res);
  return res;
};

const editSection = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/menu/editsection`, data);
  console.log(res);
  return res;
};

const addItem = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/menu/additem`, data);
  console.log(res);
  return res;
};

const deleteItem = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/menu/deleteitem`, data);
  console.log(res);
  return res;
};

const editItem = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/menu/edititem`, data);
  console.log(res);
  return res;
};

const translateMenuItem = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/menu/translatemenuitem`, data);
  console.log(res);
  return res;
};

export {
  getMenu,
  addMenu,
  addSection,
  editSection,
  addItem,
  deleteItem,
  deleteSection,
  editItem,
  translateMenuItem,
};
