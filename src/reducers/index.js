import { combineReducers } from 'redux';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  activeUser: userReducer
});

export default rootReducer;
