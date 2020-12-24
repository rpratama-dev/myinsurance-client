const INIT = {
  occupations: [],
  occupation: null,
  loading: false,
  error: null,
  stage: null,
};

export default function reducer(state = INIT, action) {
  switch (action.type) {
    case 'SET_OCCUPATIONS':
      return {
        ...state,
        occupations: action.payload.occupations,
        error: null,
        stage: action.stage,
      };
    case 'SET_OCCUPATION':
      return { ...state, occupation: action.payload.occupation, error: null, stage: action.stage };
    case 'SET_OCCUPATIONS_LOADING':
    case 'SET_OCCUPATION_LOADING': {
      const newStateLoading = {
        ...state,
        loading: action.payload,
      };
      // newStateLoading.occupations = action.type === 'SET_OCCUPATIONS' && action.payload && null;
      // newStateLoading.occupation = action.type === 'SET_OCCUPATION' && action.payload && null;
      // newStateLoading.error = action.payload && null;
      return newStateLoading;
    }
    case 'SET_OCCUPATIONS_ERROR':
    case 'SET_OCCUPATION_ERROR': {
      const newStateError = {
        ...state,
        stage: action.stage,
        error: action.payload,
      };

      // newStateError.occupations = action.type === 'SET_OCCUPATIONS' && null;
      // newStateError.occupation = action.type === 'SET_OCCUPATION' && null;
      return newStateError;
    }
    default:
      return state;
  }
}
