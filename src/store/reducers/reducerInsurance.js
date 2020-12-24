const INIT = {
  insurances: [],
  insurance: null,
  request: null,
  loading: false,
  error: null,
  stage: null,
};

export default function reducer(state = INIT, action) {
  console.log('reducer action', action);
  switch (action.type) {
    case 'SET_INSURANCES':
      return {
        ...state,
        insurances: action.payload.insurance,
        error: null,
        stage: action.stage,
      };
    case 'SET_INSURANCE':
      return { ...state, insurance: action.payload.insurance, error: null, stage: action.stage };
    case 'REQUEST_INSURANCE':
      return {
        ...state,
        request: action.payload.insurance,
        insurance: null,
        error: null,
        stage: action.stage,
      };
    case 'SET_INSURANCES_LOADING':
    case 'REQUEST_INSURANCE_LOADING':
    case 'SET_INSURANCE_LOADING': {
      const newStateLoading = {
        ...state,
        loading: action.payload,
      };
      // newStateLoading.insurances =
      //   action.type === 'SET_INSURANCES_LOADING' && !action.payload ? null : state.insurances;
      // newStateLoading.insurance =
      //   action.type === 'SET_INSURANCE_LOADING' && action.payload == false ? null : state.insurance;
      // newStateLoading.error = action.payload && null;

      // newStateLoading.request =
      //   action.type === 'REQUEST_INSURANCE_LOADING' && !action.payload ? null : state.request;
      // newStateLoading.error = action.payload && null;
      return newStateLoading;
    }
    case 'SET_INSURANCES_ERROR':
    case 'REQUEST_INSURANCE_ERROR':
    case 'SET_INSURANCE_ERROR': {
      const newStateError = {
        ...state,
        stage: action.stage,
        error: action.payload,
      };

      // newStateError.insurances = action.type === 'SET_INSURANCES' && null;
      // newStateError.insurance = action.type === 'SET_INSURANCE' && null;
      return newStateError;
    }
    default:
      return state;
  }
}
