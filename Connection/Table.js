import axios from "axios";

let url = "http://localhost:3001";
// let url = "https://adsbackend2.herokuapp.com";

const addTable = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/table/addtable`, data);
  console.log(res);
  return res;
};

const editTable = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/table/edittable`, data);
  console.log(res);
  return res;
};

const getTables = async () => {
  let res;
  res = await axios.get(`${url}/api/table/gettables`);
  console.log(res);
  return res;
};

const deleteTable = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/table/deletetable`, data);
  console.log(res);
  return res;
};

export { addTable, getTables, deleteTable, editTable };
