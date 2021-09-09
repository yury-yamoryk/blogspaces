import {
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  logout,
} from './authentication';
import { setMessage } from './message';
import UserService from "../services/UserService";

export const registerUser = (username: string, password: string) => (dispatch: (action: any) => void) => {
  return UserService.register(username, password).then(
    (response) => {
      dispatch(registerSuccess());

      dispatch(setMessage(response.data.message));

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(registerFail());

      dispatch(setMessage(message));

      return Promise.reject();
    }
  );
};

export const loginUser = (username: string, password: string) => (dispatch: (action: any) => void) => {
  return UserService.login(username, password).then(
    (responseData) => {
      dispatch(loginSuccess(responseData));

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(loginFail());

      dispatch(setMessage(message));

      return Promise.reject();
    }
  );
};
  
export const logoutUser = () => (dispatch: (action: any) => void) => {
  UserService.logout();

  dispatch(logout());
};
  