import * as actionTypes from "./actionTypes";
import axios from "axios";
const qs = require("querystring");

export const initializeFavorite = () =>{
    return {
        type: actionTypes.INITIALIZE_FAVORITE,
    }
}

export const addFavorite = (name) => {
    return {
        type: actionTypes.ADD_FAVORITE,
        recipeId: name,
    };
};

export const addFavoriteCheck = (recipeId, token_id) => {
    return (dispatch) => {
        if (token_id !== null) {
            // add to database
            const config = {
                headers: {
                    token: token_id,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            const recipeData = {
                recipe_id: recipeId,
            };
            const url = "http://3.12.253.9:3000/favorite";

            axios
                .post(url, qs.stringify(recipeData), config)
                .then((response) => {
                    console.log("inside auth add favorit");
                    // dispatch(addFavorite(recipeId));
                })
                .catch((err) => {
                    console.log(err);
                });  
        } else {
            dispatch(addFavorite(recipeId));
        }
    };
};

export const removeFavorite = (name) => {
    return {
        type: actionTypes.REMOVE_FAVORITE,
        recipeId: name,
    };
};

export const removeFavoriteCheck = (recipeId, token_id) => {
    return (dispatch) => {
        if (token_id !== null) {
            // add to database
            const config = {
                headers: {
                    token: token_id,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: qs.stringify({
                    recipe_id: recipeId,
                }),
            };

            const url = "http://3.12.253.9:3000/favorite";
            axios
                .delete(url, config)
                .then((response) => {
                    // console.log(recipeData);
                    console.log("inside auth remove favorit");
                    console.log(response.data.result);
                })
                .catch((err) => {
                    console.log(err);
                });
            // dispatch(removeFavorite(recipeId));
        } else {
            dispatch(removeFavorite(recipeId));
        }
    };
};

export const fetchFavorite = (tempFavoriteIdArray) => {
    return {
        type: actionTypes.FETCH_FAVORITE,
        favoriteIdArray: tempFavoriteIdArray,
    };
};

export const clearFavorite = () => {
    return {
        type: actionTypes.CLEAR_FAVORITE,
    };
};

export const authFavorite = (tokenid) => {
    return (dispatch) => {
        dispatch(initializeFavorite())
        if (tokenid) {
            let config = {
                headers: {
                    token: tokenid,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };

            const url = "http://3.12.253.9:3000/favorite";
            axios
                .get(url, config)
                .then((response) => {
                    // console.log(tokenid);
                    console.log(response.data.result);
                    const tempFavoriteIdArray = response.data.result.recipes.map(
                        (val) => {
                            return val.recipe_id;
                        }
                    );
                    console.log(tempFavoriteIdArray);
                    dispatch(fetchFavorite(tempFavoriteIdArray));
                })
                .catch((err) => {
                    console.log(err);
                    // TODO:
                    dispatch(clearFavorite());
                });
            //
        }
    };
};
