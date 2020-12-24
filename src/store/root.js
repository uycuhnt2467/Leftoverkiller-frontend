import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

// persist store
import authReducer from "./reducers/auth";
import ingredientsReducer from "./reducers/ingredients";
import favoriteReducer from "./reducers/favorite";

const appReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    favoriteReducer: favoriteReducer,
    authReducer: authReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "CLEAR_STORE") return appReducer(undefined, action);
    return appReducer(state, action);
};

export default rootReducer;
