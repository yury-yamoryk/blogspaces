import http from "./HttpService";
import WebTokenHelper from "../helpers/WebTokenHelper";

const getAll = () => {
  return http.get("/spaces/users", { headers:  WebTokenHelper.buildHttpHeader()});
};

const register = (username: string, password: string) => {
  return http.post("/spaces/register", {
    username,
    password,
  });
};

const login = (username: string, password: string) => {
  return http
    .post("/spaces/authenticate", {
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