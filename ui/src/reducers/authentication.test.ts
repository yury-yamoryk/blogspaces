import authenticationReducer from './authentication'
import * as actionTypes from '../actions/types'

describe("authentication state", () => {
    it ("should have isLoggedIn=false after REGISTER_SUCCESS", () => {
        const testPayload = {};
        const newState = authenticationReducer(undefined, { type: actionTypes.REGISTER_SUCCESS, payload: testPayload});

        expect(newState.isLoggedIn).toBe(false);
    });

    it ("should have isLoggedIn=false after REGISTER_FAIL", () => {
        const testPayload = {};
        const newState = authenticationReducer(undefined, { type: actionTypes.REGISTER_FAIL, payload: testPayload});

        expect(newState.isLoggedIn).toBe(false);
    });

    it ("should have isLoggedIn=true after LOGIN_SUCCESS", () => {
        const testPayload = {};
        const newState = authenticationReducer(undefined, { type: actionTypes.LOGIN_SUCCESS, payload: testPayload});

        expect(newState.isLoggedIn).toBe(true);
    });

    it ("should have isLoggedIn=false after LOGIN_FAIL", () => {
        const testPayload = {};
        const newState = authenticationReducer(undefined, { type: actionTypes.LOGIN_FAIL, payload: testPayload});

        expect(newState.isLoggedIn).toBe(false);
    });

    it ("should have isLoggedIn=false after LOGOUT", () => {
        const testPayload = {};
        const newState = authenticationReducer(undefined, { type: actionTypes.LOGOUT, payload: testPayload});

        expect(newState.isLoggedIn).toBe(false);
    });
});