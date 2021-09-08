import http from "./HttpService";
import User from "../entities/User";

const getAll = () => {
  return http.get("/users");
};

const register = (username: string, password: string) => {
  return http.post("/register", {
    username,
    password,
  });
};

const login = (username: string, password: string) => {
  return http
    .post("/authenticate", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const UserService = {
  getAll,
  register,
  login,
  logout,
};

export default UserService