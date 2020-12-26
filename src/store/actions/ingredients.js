import * as actionTypes from "./actionTypes";
import axios from "axios";
const qs = require("querystring");

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient_info: ingredient,
    };
};

export const addIngredientCheck = (ingredient_id, token_id) => {
    return (dispatch) => {
        const config = {
            headers: {
                token: token_id,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        const ingredientData = {
            ingredient_id: ingredient_id,
        };
        let url = "http://3.12.253.9:3000/ingredient/";

        axios
            .get(`${url}${ingredient_id}`)
            .then((response) => {
                const ingredient = response.data.result;
                // console.log(ingredient);
                if (token_id !== null) {
                    url = "http://3.12.253.9:3000/pantry/id";
                    axios
                        .post(url, qs.stringify(ingredientData), config)
                        .then((response) => {
                            // console.log(response);
                            // console.log("inside add pantry");
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    dispatch(addIngredient(ingredient));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient_id: name,
    };
};

export const removeIngredientCheck = (ingredient_id, token_id) => {
    return (dispatch) => {
        if (token_id !== null) {
            // add to database
            const config = {
                headers: {
                    token: token_id,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: qs.stringify({
                    ingredient_id: ingredient_id,
                }),
            };

            const url = "http://3.12.253.9:3000/pantry";
            axios
                .delete(url, config)
                .then((response) => {
                    // console.log(recipeData);
                    // console.log("inside auth remove pantry");
                    // console.log(response.data.result);
                })
                .catch((err) => {
                    console.log(err);
                });
            // dispatch(removeFavorite(recipeId));
        } else {
            dispatch(removeIngredient(ingredient_id));
        }
    };
};

export const initializePantry = () => {
    return {
        type: actionTypes.INITIALIZE_PANTRY,
    };
};

export const clearPantry = () => {
    return {
        type: actionTypes.CLEAR_PANTRY,
    };
};

export const fetchPantry = (ingredient_list) => {
    return {
        type: actionTypes.FETCH_PANTRY,
        ingredients: ingredient_list,
    };
};

export const fetchPantryEnd = () => {
    return {
        type: actionTypes.FETCH_PANTRY_END,
    };
};

export const authPantry = (tokenid) => {
    return (dispatch) => {
        dispatch(initializePantry());
        if (tokenid !== null) {
            console.log("intilize pantry action");
            dispatch(clearPantry());
            let config = {
                headers: {
                    token: tokenid,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };

            const url = "http://3.12.253.9:3000/pantry";
            axios
                .get(url, config)
                .then((response) => {
                    // console.log(response.data.result);
                    const tempIngredientArray = response.data.result.ingredients.map(
                        (val) => {
                            return {
                                ingredient_id: val.ingredient_id,
                                ingredient_name: val.ingredient_name,
                                image_url: val.img_url,
                            };
                        }
                    );
                    // console.log(tempIngredientArray);
                    dispatch(fetchPantry(tempIngredientArray));
                })
                .catch((err) => {
                    console.log(err);
                    // TODO:
                    dispatch(clearPantry());
                });
            //
        } else {
            dispatch(fetchPantryEnd());
        }
    };
};
