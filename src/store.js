import { createStore } from "redux";
import reducers from "./reducers/reducers";
import StateLoader from './StateLoader'

const stateLoader = new StateLoader();

function configureStore(state = stateLoader.loadState()) {
  return createStore(reducers,state);
}

export default configureStore;