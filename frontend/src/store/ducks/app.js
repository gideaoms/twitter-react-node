export const Types = {
  GET_TOKEN_REVERSE_REQUEST: 'user/GET_TOKEN_REVERSE_REQUEST',
  GET_TOKEN_REVERSE_FAILURE: 'user/GET_TOKEN_REVERSE_FAILURE',
  SET_USER_TOKEN: 'user:/SET_USER_TOKEN',
  SET_USER_LOGOUT: 'user:/SET_USER_LOGOUT',
};

const INITIAL_STATE = {
  user: {
    oauth_token: '',
    oauth_token_secret: '',
    screen_name: '',
    authenticated: false,
    loading: true,
  },
  token_reverse: '',
  loading: false,
};

export default function app(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_TOKEN_REVERSE_REQUEST:
      return { ...state, loading: true };
    case Types.GET_TOKEN_REVERSE_FAILURE:
      return { ...state, loading: false };
    case Types.SET_USER_TOKEN:
      return {
        ...state,
        user: {
          oauth_token: action.payload.user.oauth_token,
          oauth_token_secret: action.payload.user.oauth_token_secret,
          screen_name: action.payload.user.screen_name,
          authenticated: action.payload.user.authenticated,
          loading: false,
        },
      };
    case Types.SET_USER_LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        user: {
          oauth_token: '',
          oauth_token_secret: '',
          screen_name: '',
          authenticated: false,
          loading: false,
        },
      };
    default:
      return state;
  }
}

export const Creators = {
  getTokenReverseRequest: () => ({ type: Types.GET_TOKEN_REVERSE_REQUEST }),
  getTokenReverseFailure: () => ({ type: Types.GET_TOKEN_REVERSE_FAILURE }),
  setUserToken: user => ({ type: Types.SET_USER_TOKEN, payload: { user } }),
  userLogout: () => ({ type: Types.SET_USER_LOGOUT }),
};
