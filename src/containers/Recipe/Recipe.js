import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import classes from "./Recipe.module.css";

const config = require("../../config/development_config");

const Recipe = (props) => {
    const [loading, setLoading] = useState(true);
    const [inFavorite, setInFavorite] = useState(false);
    const [recipe, setRecipe] = useState({
        recipe_id: "",
        recipe_name: "",
        popularity: 0,
        instructions: "",
        img_url: "",
        ingredients: [],
    });

    useEffect(() => {
        const { recipeId } = props.match.params;
        props.onInitializeFavorite(props.token_id);

        const inFavoriteCheck = props.favorite_recipe.filter(
            (val) => parseInt(val.recipe_id) === parseInt(recipeId)
        );
        if (inFavoriteCheck.length === 0) {
            setInFavorite(false);
        } else {
            setInFavorite(true);
        }

        let url = config.backend_addr + "/recipe/";

        axios.get(`${url}${recipeId}`).then((res) => {
            setRecipe(res.data.result);
            setLoading(false);
        });
    }, [props.token_id]);

    const handleAddFavorite = (e) => {
        e.preventDefault();
        props.onFavoriteAdded(e.target.value, props.token_id);
        setInFavorite(true);
    };

    const handleRemoveFavorite = (e) => {
        e.preventDefault();
        props.onFavoriteRemoved(e.target.value, props.token_id);
        setInFavorite(false);
    };

    let curRecipe = <Spinner />;
    if (!loading) {
        if (!inFavorite) {
            curRecipe = (
                <RecipeDetail
                    recipeInfo={recipe}
                    clickedFunction={handleAddFavorite}
                    favoriteChecked={inFavorite}
                />
            );
        } else {
            curRecipe = (
                <RecipeDetail
                    recipeInfo={recipe}
                    clickedFunction={handleRemoveFavorite}
                    favoriteChecked={inFavorite}
                />
            );
        }
    }

    return (
        <Aux>
            <div className={classes.flex_container}>{curRecipe}</div>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        token_id: state.authReducer.token,
        favorite_recipe: state.favoriteReducer.favorite_recipe,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFavoriteAdded: (recipe_id, token_id) =>
            dispatch(actions.addFavoriteCheck(recipe_id, token_id)),
        onFavoriteRemoved: (recipe_id, token_id) =>
            dispatch(actions.removeFavoriteCheck(recipe_id, token_id)),
        onInitializeFavorite: (token_id) => {
            dispatch(actions.authFavorite(token_id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);