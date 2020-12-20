import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

// persist store
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import "./index.module.css";
import App from "./App";
// import burgerBuilderReducer from "./store/reducers/burgerBuilder";
// import orderReducer from "./store/reducers/order";
// import authReducer from "./store/reducers/auth";
import ingredientsReducer from "./store/reducers/ingredients";
import favoriteReducer from "./store/reducers/favorite";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    favoriteReducer: favoriteReducer,
});

const myReducer = persistReducer(
    {
        key: "root",
        storage,
    },
    rootReducer
);
// const store = createStore(
//     rootReducer,
//     composeEnhancers(applyMiddleware(thunk))
// );
const store = createStore(myReducer, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store);

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// registerServiceWorker();
