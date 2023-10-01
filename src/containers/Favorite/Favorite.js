import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import FavoriteRecipeDisplay from "./FavoriteRecipeDisplay/FavoriteRecipeDisplay";
import classes from "./Favorite.module.css";
import * as actions from "../../store/actions/index";

const Favorite = (props) => {
    const [filter_favorite_recipe_info, setFilterFavoriteRecipeInfo] = useState([]);
    const [currentQuery, setCurrentQuery] = useState("");

    useEffect(() => {
        props.onInitializeFavorite(props.token_id);
        return () => { setFilterFavoriteRecipeInfo([]);}
    }, [props.token_id]);

    useEffect(() => {
        setFilterFavoriteRecipeInfo(props.favorite_recipe);
        return () => { setFilterFavoriteRecipeInfo([]);}
    }, [props.favorite_recipe])

    const handleSearchChange = (e) => {
        setCurrentQuery(e.target.value);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();

        let newRecipeResult = props.favorite_recipe.filter((rec) => {
            return rec.recipe_name.toLowerCase().includes(currentQuery.toLowerCase());
        });

        setFilterFavoriteRecipeInfo(newRecipeResult);
    };

    let filter_favorite_recipe = <Spinner />;
    if (!props.loading) {
        if (props.favorite_recipe.length === 0) {
            filter_favorite_recipe = (
                <h1 className={classes.noItemTitle}>
                    No recipe in the favorite list, add a recipe
                    <Link to="/">here</Link>.
                </h1>
            );
        } else {
            filter_favorite_recipe = filter_favorite_recipe_info.map((val) => {
                return FavoriteRecipeDisplay(val);
            });
        }
    }

    return (
        <Aux>
            <div className={classes.inputDiv}>
                <h1 className={classes.title}>Favorite Recipe</h1>
                <input
                    type="text"
                    onChange={handleSearchChange}
                    name="curSearch"
                    placeholder="Any Recipe"
                    value={currentQuery}
                />
                <button type="submit" onClick={handleSearchClick}>
                    Search
                </button>
            </div>
            <div className={classes.flex_container}>
                {filter_favorite_recipe}
            </div>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        favorite_recipe: state.favoriteReducer.favorite_recipe,
        token_id: state.authReducer.token,
        loading: state.favoriteReducer.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitializeFavorite: (token_id) => {
            dispatch(actions.authFavorite(token_id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
