import { createStore, applyMiddleware, compose } from "redux";
import DevTools from "./devtool";
import { reducers } from "./reducers/index";
import createLogger from "redux-logger";

let enhancers;
const middleware = applyMiddleware(createLogger());

if(process.env.NODE_ENV == 'production'){
  enhancers =  compose(middleware);
}
else{
  enhancers =  compose(middleware, DevTools.instrument());
}

const store = createStore(reducers, {}, enhancers);
export default store;
