import * as actionTypes from "./actionTypes";
import axios from "axios";
const qs = require("querystring");

export const initializeFavorite = () => {
    return {
        type: actionTypes.INITIALIZE_FAVORITE,
    };
};

export const addFavorite = (recipe) => {
    return {
        type: actionTypes.ADD_FAVORITE,
        recipe_info: recipe,
    };
};

export const addFavoriteCheck = (recipeId, token_id) => {
    return (dispatch) => {
        const config = {
            headers: {
                token: token_id,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        const recipeData = {
            recipe_id: recipeId,
        };
        let url = config.backend_addr + "/recipe/";
        // console.log(token_id);
        axios
            .get(`${url}${recipeId}`)
            .then((response) => {
                const recipe = response.data.result;
                // console.log(recipe);
                if (token_id !== null) {
                    url = config.backend_addr + "/favorite";
                    axios
                        .post(url, qs.stringify(recipeData), config)
                        .then((response) => {
                            // console.log(response);
                            // console.log("inside add favorit");
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    dispatch(addFavorite(recipe));
                }
            })
            .catch((err) => {
                console.log(err);
            });
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

            const url = config.backend_addr + "/favorite";
            axios
                .delete(url, config)
                .then((response) => {
                    // console.log(recipeData);
                    // console.log("inside auth remove favorit");
                    // console.log(response.data.result);
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

export const fetchFavorite = (tempFavoriteArray) => {
    return {
        type: actionTypes.FETCH_FAVORITE,
        favoriteArray: tempFavoriteArray,
    };
};

export const fetchFavrotieEnd = () => {
    return {
        type: actionTypes.FETCH_FAVORITE_END,
    };
};

export const clearFavorite = () => {
    return {
        type: actionTypes.CLEAR_FAVORITE,
    };
};

export const authFavorite = (tokenid) => {
    return (dispatch) => {
        dispatch(initializeFavorite());
        if (tokenid !== null) {
            // console.log("intilize favorite action");
            dispatch(clearFavorite());
            let config = {
                headers: {
                    token: tokenid,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };

            const url = config.backend_addr + "/favorite";
            axios
                .get(url, config)
                .then((response) => {
                    // console.log(tokenid);
                    // console.log(response.data.result);
                    const tempFavoriteArray = response.data.result.recipes.map(
                        (val) => ({
                            recipe_id: val.recipe_id,
                            recipe_name: val.recipe_name,
                            image_url: val.img_url,
                        })
                    );
                    // console.log(tempFavoriteArray);
                    dispatch(fetchFavorite(tempFavoriteArray));
                })
                .catch((err) => {
                    console.log(err);
                    // TODO:
                    dispatch(clearFavorite());
                });
            //
        } else {
            dispatch(fetchFavrotieEnd());
        }
    };
};
