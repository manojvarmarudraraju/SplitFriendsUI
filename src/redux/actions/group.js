import { GROUP_ADD_FAILURE, GROUP_ADD_SUCCESS, SET_MESSAGE } from "./types";

import AuthService from "../services/AuthService";

export const addGroup = (obj) => (dispatch) => {
    return AuthService.addGroup(obj).then(
        (response) => {
            dispatch({
                type: GROUP_ADD_SUCCESS,
            });
            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: GROUP_ADD_FAILURE,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: "Something went wrong.",

            });
            return Promise.reject();
        }
    );
};