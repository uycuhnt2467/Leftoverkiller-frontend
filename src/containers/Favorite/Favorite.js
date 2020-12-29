import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import FavoriteRecipeDisplay from "./FavoriteRecipeDisplay/FavoriteRecipeDisplay";
import classes from "./Favorite.module.css";
import * as actions from "../../store/actions/index";

class Favroite extends Component {
    state = {
        success: false,
        favorite_recipe_info: [
            // {
            //     recipe_id: "",
            //     recipe_name: "",
            //     img_url: "",
            // }
        ],
        error: "",
    };

    componentDidMount() {
        // console.log(this.props.token_id);
        this.props.onInitializeFavorite(this.props.token_id);
        // console.log("initilaize favorite");
        // console.log(this.props.favorite_recipe);
    }

    render() {
        let favorite_recipe_info = <Spinner />;
        if (!this.props.loading) {
            if (this.props.favorite_recipe.length === 0) {
                favorite_recipe_info = (
                    <h1 className={classes.noItemTitle}>
                        No recipe in the favorite list, add recipe{" "}
                        <Link to="/">here</Link>.
                    </h1>
                );
            } else {
                favorite_recipe_info = this.props.favorite_recipe.map((val) => {
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
                        // onChange={this.handleSearchChange}
                        name="curSearch"
                        placeholder="Any Recipe"
                        value={this.state.currentQuery}
                    ></input>
                    <button type="submit" onClick={this.handleSearchClick}>
                        Search
                    </button>
                </div>
                <div className={classes.flex_container}>
                    {favorite_recipe_info}
                </div>
            </Aux>
        );
    }
}

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

// export default Recipe;
export default connect(mapStateToProps, mapDispatchToProps)(Favroite);
