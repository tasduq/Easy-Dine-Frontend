import axios from "axios";

// let url = "http://localhost:3001";
let url = "https://easydinebackend.herokuapp.com";

const signupUser = async (data) => {
  console.log(data);
  let res;
  res = await axios.post(`${url}/api/users/register`, data);
  console.log(res);
  return res;
};

const loginUser = async (data) => {
  console.log(data);
  let res = await axios.post(`${url}/api/users/login`, data);
  console.log(res);
  return res;
};

export { signupUser, loginUser };
