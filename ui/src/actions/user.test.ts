import { registerUser, loginUser, logoutUser } from './user';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    CLEAR_MESSAGE } from "./types";
import UserService from '../services/UserService';

jest.mock("../services/UserService");

describe("registerUser action", () => {
    it ("should return function dispatching REGISTER_SUCCESS", async () => {
        const actualAction = registerUser("testUserName", "testPassword");
        const mockedUserServiceRegister = UserService.register as jest.Mock;
        mockedUserServiceRegister.mockResolvedValue({ data: {}} /* response */);

        let recordedActions: string[] = [];
        await actualAction((action) => {
            recordedActions.push(action.type);
        } /* dispatch */);

        expect(recordedActions).toContain(REGISTER_SUCCESS);
        expect(recordedActions).toContain(SET_MESSAGE);
    });

    it ("should return function dispatching REGISTER_FAIL", async () => {
        const actualAction = registerUser("testUserName", "testPassword");
        const mockedUserServiceRegister = UserService.register as jest.Mock;
        mockedUserServiceRegister.mockRejectedValue({ message: "testMessage" } /* response */);

        let recordedActions: string[] = [];
        await actualAction((action) => {
            recordedActions.push(action.type);
        } /* dispatch */).catch(() => {});

        expect(recordedActions).toContain(REGISTER_FAIL);
        expect(recordedActions).toContain(SET_MESSAGE);
    });
});

describe("loginUser action", () => {
    it ("should return function dispatching LOGIN_SUCCESS", async () => {
        const actualAction = loginUser("testUserName", "testPassword");
        const mockedUserServiceRegister = UserService.login as jest.Mock;
        mockedUserServiceRegister.mockResolvedValue({} /* response */);

        let recordedActions: string[] = [];
        await actualAction((action) => {
            recordedActions.push(action.type);
        } /* dispatch */);

        expect(recordedActions).toContain(LOGIN_SUCCESS);
    });

    it ("should return function dispatching LOGIN_FAIL", async () => {
        const actualAction = loginUser("testUserName", "testPassword");
        const mockedUserServiceRegister = UserService.login as jest.Mock;
        mockedUserServiceRegister.mockRejectedValue({ message: "testMessage" } /* response */);

        let recordedActions: string[] = [];
        await actualAction((action) => {
            recordedActions.push(action.type);
        } /* dispatch */).catch(() => {});

        expect(recordedActions).toContain(LOGIN_FAIL);
        expect(recordedActions).toContain(SET_MESSAGE);
    });
});

describe("logoutUser action", () => {
    it ("should return function dispatching LOGOUT", async () => {
        const actualAction = logoutUser();
        const mockedUserServiceRegister = UserService.logout as jest.Mock;
        mockedUserServiceRegister.mockResolvedValue({} /* response */);

        let recordedActions: string[] = [];
        await actualAction((action) => {
            recordedActions.push(action.type);
        } /* dispatch */);

        expect(recordedActions).toContain(LOGOUT);
    });
});