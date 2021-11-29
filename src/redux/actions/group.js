import { GROUP_ADD_FAILURE, 
    GROUP_ADD_SUCCESS, 
    GROUP_GET_SUCCESS,
    GROUP_GET_FAILURE,
    SET_MESSAGE,
    ADD_EXP_SUCCESS,
    ADD_EXP_FAILURE,
 } from "./types";

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

export const getAllGroups = () => (dispatch) => {
    return AuthService.getAllGroups().then(
        (response) => {
            dispatch({
                type: GROUP_GET_SUCCESS,
                payload: {
                    groups: response.data,
                }
            });
            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: GROUP_GET_FAILURE,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: "Something went wrong.",

            });
            return Promise.reject();
        }
    );
};

export const addExpense = (id, obj) => (dispatch) => {
    return AuthService.addExpense(id, obj).then(
        (response) => {
            dispatch({
                type: ADD_EXP_SUCCESS,
            });
            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: ADD_EXP_FAILURE,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: "Something went wrong.",

            });
            return Promise.reject();
        }
    );
};