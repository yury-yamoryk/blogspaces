import http from "./HttpService";
import User from "../entities/User";

const getAll = () => {
  return http.get("/users");
};

const UserService = {
  getAll: getAll,
};

export default UserService