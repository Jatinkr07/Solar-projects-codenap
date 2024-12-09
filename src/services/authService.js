import axios from "axios";

import API_URL from "../api";

export const adminLogin = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/admin-login`, {
    email,
    password,
  });
  localStorage.setItem("adminToken", response.data.token);
  return response.data;
};
