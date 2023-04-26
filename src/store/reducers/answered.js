import { defineState } from "redux-localstore";

const defaultState = {
  answered: [],
};

const initialState = defineState(defaultState)("answered");

export const answered = (state = initialState, action) => {
  switch (action.type) {
    case "ACTION_ANSWERED":
      return {
        ...state,
        answered: action.payload,
      };
    case "ANSWERED_CLEAR":
      return {
        ...state,
        answered: [],
      };
    default:
      return state;
  }
};
