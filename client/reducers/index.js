import { combineReducers } from "redux";
import home from './home';
import markers from './markers';
import form from './form';

export const reducers = combineReducers({
  home,
  markers,
  form
});
