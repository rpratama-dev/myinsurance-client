import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerOccupation from './reducerOccupation';
import reducerInsurance from './reducerInsurance';

export default combineReducers({
  reducerUser,
  reducerOccupation,
  reducerInsurance,
});
