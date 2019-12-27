import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";


const initialState={};

const middleware=[thunk];

const reducers=combineReducers({
    user:userReducer,
    data:dataReducer,
    UI:uiReducer
});

const store=createStore(reducers, initialState,
    compose(applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export default store