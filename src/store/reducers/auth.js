import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/",
    errorBackend: null,
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        errorBackend: null,
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        error: null,
        loading: false,
        errorBackend: null,
    });
};

const authFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null });
};

// const setAuthRedirctPath = (state, action) => {
//     return updateObject(state, { authRedirectPath: action.path });
// };

const authHandleCustomError = (state, action) => {
    return updateObject(state, {
        errorBackend: action.customError,
        loading: false,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        // case actionTypes.SET_AUTH_REDIRECT_PATH:
        //     return setAuthRedirctPath(state, action);
        case actionTypes.AUTH_HANDLE_CUSTOM_ERROR:
            return authHandleCustomError(state, action);
        default:
            return state;
    }
};

export default reducer;
