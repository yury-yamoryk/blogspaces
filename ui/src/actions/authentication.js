import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "./types";

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS,
});

export const registerFail = () => ({
    type: REGISTER_FAIL,
});

export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: { user: userData }
});

export const loginFail = () => ({
    type: LOGIN_FAIL,
});

export const logout = () => ({
    type: LOGOUT,
});
