import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addFavorite = (name) => {
    return {
        type: actionTypes.ADD_FAVORITE,
        recipeId: name,
    };
};

export const removeFavorite = (name) => {
    return {
        type: actionTypes.REMOVE_FAVORITE,
        recipeId: name,
    };
};

export const fetchFavorite = () => {
    return {
        type: actionTypes.FETCH_FAVORITE,
    };
};

export const clearFavorite = () => {
    return {
        type: actionTypes.CLEAR_FAVORITE,
    };
};

export const authFavorite = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            // didn't log in, should return empty list
            dispatch(clearFavorite());
        } else {
            // didnt log in
            let config = {
                headers: {
                    token: token,
                },
            };

            const url = "http://3.12.253.9:3000/favorite";
            axios
                .get(url, config)
                .then((response) => {
                    console.log(response);
                    dispatch(fetchFavorite(response))
                })
                .catch((err) => {
                    console.log(err);
                    // TODO:
                    dispatch(clearFavoirte());
                });
            //
        }
    };
};
