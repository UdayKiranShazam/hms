import { combineReducers } from 'redux';
import loader from './reducers/loader';
import usermanagement from './reducers/usermanagement';
import department from "./reducers/departmentlist";
import status from './reducers/status';

const rootReducer = combineReducers({
  loader,
  status,
  usermanagement,
  department
});

export default rootReducer;
