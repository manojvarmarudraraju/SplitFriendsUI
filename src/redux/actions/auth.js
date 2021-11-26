import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";

import AuthService from "../services/AuthService";

export const register = (obj) => (dispatch) => {
    return AuthService.register(obj).then(
        (response) => {

            const message = "Registration Successful!";

            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,

                payload: message,

            });

            return Promise.resolve();
        },
        (error) => {

            const message = "Something went wrong.";

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (obj) => (dispatch) => {
    return AuthService.login(obj).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {

                    user: data.user,
                    token: data.token,
                },
            });

            return Promise.resolve();
        },
        (error) => {

            const message = "Something went wrong.";


            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};