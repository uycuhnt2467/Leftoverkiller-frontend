import * as actionTypes from "./actionTypes";
import axios from "axios";


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    // localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    // localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
            dispatch({ type: actionTypes.CLEAR_STORE });
        }, expirationTime * 1000);
    };
};

export const auth = (username, email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            username: username,
            email: email,
            hash_password: password,
        };

        const config = {
            "Content-Type": "x-www-form-urlencoded",
        };
        let url = "http://3.12.253.9:3000/register";

        if (!isSignup) {
            url = "http://3.12.253.9:3000/login";
        }

        axios
            .post(url, authData, config)
            .then((response) => {
                console.log(authData);

                const expirationDate = new Date(
                    new Date().getTime() + 1000 * 1000
                );
                // localStorage.setItem("token", response.headers.token);
                localStorage.setItem("expirationDate", expirationDate);
                // localStorage.setItem("userId", response.data.localId);
                // console.log(authData);
                console.log(response);
                console.log("here auth");
                console.log(response.data.result.token);
                dispatch(authSuccess(response.data.result.token));
                dispatch(checkAuthTimeout(1800));
            })
            .catch((err) => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

// export const setAuthRedirectPath = (path) => {
//     return {
//         type: actionTypes.SET_AUTH_REDIRECT_PATH,
//         path: path,
//     };
// };

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
                dispatch({ type: actionTypes.CLEAR_STORE });
            } else {
                // const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};
