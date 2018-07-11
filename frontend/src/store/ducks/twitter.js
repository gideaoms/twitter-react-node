export const Types = {
  GET_LIST_REQUEST: 'twitter/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'twitter/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'twitter/GET_LIST_FAILURE',
  VALIDATE_TOKEN_REQUEST: 'twitter/VALIDATE_TOKEN_REQUEST',
  VALIDATE_TOKEN_SUCCESS: 'twitter/VALIDATE_TOKEN_SUCCESS',
  ADD_TWEET_REQUEST: 'twitter/ADD_TWEET_REQUEST',
};

const INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
  },
  validate: {
    oauth_token: '',
    oauth_verifier: '',
    loading: true,
  },
};

export default function twitter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_LIST_REQUEST:
      return { ...state, list: { loading: true } };
    case Types.GET_LIST_SUCCESS:
      return { ...state, list: { data: action.payload.data, loading: false } };
    case Types.GET_LIST_FAILURE:
      return { ...state, list: { loading: false, data: [] } };
    case Types.VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        validate: {
          oauth_token: action.payload.oauth_token,
          oauth_verifier: action.payload.oauth_verifier,
          loading: false,
        },
      };
    default:
      return state;
  }
}

export const Creators = {
  getTweetsRequest: () => ({ type: Types.GET_LIST_REQUEST }),
  getTweetsSuccess: data => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data },
  }),
  getTweetsFailure: () => ({ type: Types.GET_LIST_FAILURE }),
  validateTokenRequest: (oauth_token, oauth_verifier) => ({
    type: Types.VALIDATE_TOKEN_REQUEST,
    payload: { oauth_token, oauth_verifier },
  }),
  validateTokenSuccess: (oauth_token, oauth_verifier) => ({
    type: Types.VALIDATE_TOKEN_SUCCESS,
    payload: { oauth_token, oauth_verifier },
  }),
  addTweet: (text, resetText) => ({
    type: Types.ADD_TWEET_REQUEST,
    payload: { text, resetText },
  }),
};
