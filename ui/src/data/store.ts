import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import combinedReducers from "../reducers/combinedReducers";

const middleware = [thunk];

const store = createStore(
    combinedReducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
