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
      if (response.data.message && response.data.message.indexOf("Error") > -1) {
        const message =
        (response && response.data && response.data.message) ||
        response.data.message ||
        response.toString();

        dispatch(registerFail());

        dispatch(setMessage(message));

        return Promise.reject();
      } else {
        dispatch(registerSuccess());

        dispatch(setMessage(response.data.message));

        return Promise.resolve();
      }
    }
  );
};

export const loginUser = (username: string, password: string) => (dispatch: (action: any) => void) => {
  return UserService.login(username, password).then(
    (responseData) => {
      if (responseData.token) {
        dispatch(loginSuccess(responseData));

        return Promise.resolve();
      } else {
        const message =
        (responseData.response && responseData.response.data && responseData.response.data.message) ||
        responseData.message ||
        responseData.toString();

        dispatch(loginFail());

        dispatch(setMessage(message));
        return Promise.reject();
      }
    }
  );
};
  
export const logoutUser = () => (dispatch: (action: any) => void) => {
  UserService.logout();

  dispatch(logout());
};
  