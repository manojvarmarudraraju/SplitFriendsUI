import { GROUP_ADD_FAILURE, GROUP_ADD_SUCCESS } from "../actions/types";

const groups = JSON.parse(localStorage.getItem("groups"));

const initialState = (groups) ? { groups: groups } : {groups: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GROUP_ADD_FAILURE:
          return {
            ...state,
          };
        case GROUP_ADD_SUCCESS:
          return {
            ...state,
          };
        default:
          return state;
      }

}