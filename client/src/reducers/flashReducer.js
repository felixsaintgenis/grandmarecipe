import { FLASH_MESSAGE, HIDE_FLASH_MESSAGE } from "../actions/action-types";

const initialState = {
  successMessage: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FLASH_MESSAGE:
      return action.payload;
    case HIDE_FLASH_MESSAGE:
      return {
        successMessage: null
      };
    default:
      return state;
  }
};
