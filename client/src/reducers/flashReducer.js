import { FLASH_MESSAGE, HIDE_FLASH_MESSAGE } from "../actions/action-types";

const initialState = {
  message: null,
  className: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FLASH_MESSAGE:
      return action.payload;
    case HIDE_FLASH_MESSAGE:
      return {
        message: null,
        className: null
      };
    default:
      return state;
  }
};
