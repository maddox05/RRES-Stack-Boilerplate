const HIDE_FLASH = "components/FlashMessage/HIDE_FLASH";
const SHOW_FLASH = "components/FlashMessage/SHOW_FLASH";

export function showFlashMessage(msg: string, error: string) {
  return {
    type: SHOW_FLASH,
    payload: {
      msg,
      error,
    },
  };
}

export function hideFlashMessage() {
  return { type: HIDE_FLASH };
}

const DEFAULT_STATE = {
  show: false,
  msg: null,
  error: null,
};

export default function flashReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SHOW_FLASH:
      return {
        ...state,
        show: true,
        msg: action.payload.msg,
        error: action.payload.error,
      };
    case HIDE_FLASH:
      return { ...state, ...DEFAULT_STATE, show: false };
    default:
      return state;
  }
}

export const selectFlashMessageState = function (state) {
  return {
    show: state.flashMessage.show,
    msg: state.flashMessage.msg,
    error: state.flashMessage.error,
  };
};
