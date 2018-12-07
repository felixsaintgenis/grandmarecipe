import { FLASH_MESSAGE, HIDE_FLASH_MESSAGE } from "../actions/action-types";

export const sendFlashMessage = (messageType, message) => {
  return {
    type: FLASH_MESSAGE,
    payload: {
      messageType,
      message
    }
  };
};

export const deleteFlashMessage = () => {
  return { type: HIDE_FLASH_MESSAGE };
};
