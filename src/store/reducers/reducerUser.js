const INIT = {
  users: [],
  user: null,
  loading: false,
  error: null,
  stage: null,
};

export default function reducer(state = INIT, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, error: null, stage: action.stage };
    case 'SET_USER':
      return { ...state, user: action.payload.user, error: null, stage: action.stage };
    case 'SET_USERS_LOADING':
    case 'SET_USER_LOADING': {
      const newStateLoading = {
        ...state,
        loading: action.payload,
      };
      newStateLoading.users = action.type === 'SET_USERS' && action.payload && null;
      newStateLoading.user = action.type === 'SET_USER' && action.payload && null;
      newStateLoading.error = action.payload && null;
      return newStateLoading;
    }
    case 'SET_USERS_ERROR':
    case 'SET_USER_ERROR': {
      const newStateError = {
        ...state,
        stage: action.stage,
        error: action.payload,
      };

      newStateError.users = action.type === 'SET_USERS' && null;
      newStateError.user = action.type === 'SET_USER' && null;
      return newStateError;
    }
    default:
      return state;
  }
}
