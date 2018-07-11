export const Types = {
  SET_ERROR: 'error/SET_ERROR',
  SET_SUCCESS: 'error/SET_SUCCESS',
  HIDE: 'error/HIDE',
};

const INITIAL_STATE = {
  visible: false,
  message: {
    type: '',
    text: '',
  },
};

export default function playlists(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_ERROR:
      return {
        ...state,
        visible: true,
        message: { text: action.payload.message, type: 'error' },
      };
    case Types.SET_SUCCESS:
      return {
        ...state,
        visible: true,
        message: { text: action.payload.message, type: 'success' },
      };
    case Types.HIDE:
      return { ...state, visible: false, message: INITIAL_STATE.message };
    default:
      return state;
  }
}

export const Creators = {
  setMessageError: message => ({ type: Types.SET_ERROR, payload: { message } }),
  setMessageSuccess: message => ({ type: Types.SET_SUCCESS, payload: { message } }),
  hideMessage: () => ({
    type: Types.HIDE,
  }),
};
