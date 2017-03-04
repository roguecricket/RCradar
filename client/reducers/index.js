import { combineReducers } from "redux";
import home from './home';
import markers from './markers';

export const reducers = combineReducers({
  home,
  markers
});
