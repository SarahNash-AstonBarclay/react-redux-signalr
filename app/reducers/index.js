import {combineReducers} from 'redux';
import reducer from './reducer';

// main reducers
export const reducers = combineReducers({
  reducer: reducer
});
