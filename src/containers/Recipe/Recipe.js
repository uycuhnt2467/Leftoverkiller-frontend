import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import classes from "./Recipe.module.css";

class Recipe extends Component {
    state = {
        success: false,
        // recipe: {
        //     recipe_id: "",
        //     recipe_name: "",
        //     popularity: 0,
        //     instructions: "",
        //     img_url: "",
        //     ingredients: [],
        // },
        error: "",
        loading: true,
        inFavorite: false,
    };

    componentDidMount() {
        const { recipeId } = this.props.match.params;
        this.props.onInitializeFavorite(this.props.token_id);

        const inFavoriteCheck = this.props.favorite_recipe.filter(
            (val) => parseInt(val.recipe_id) === parseInt(recipeId)
        );
        if (inFavoriteCheck.length === 0) {
            this.setState({ inFavorite: false });
        } else {
            this.setState({ inFavorite: true });
        }

        let url = "http://3.12.253.9:3000/recipe/";

        axios.get(`${url}${recipeId}`).then((res) => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    success: res.data.result.success,
                    recipe: res.data.result,
                    loading: false,
                };
            });
            // console.log(this.state);
        });
    }

    handleAddFavorite = (e) => {
        e.preventDefault();
        this.props.onFavoriteAdded(e.target.value, this.props.token_id);
        this.setState({ inFavorite: true });
    };

    handleRemoveFavorite = (e) => {
        e.preventDefault();
        // console.log(e.target.value);
        this.props.onFavoriteRemoved(e.target.value, this.props.token_id);
        this.setState({ inFavorite: false });
    };

    render() {
        let curRecipe = <Spinner />;
        if (!this.state.loading) {
            // curRecipe = recipe_info(
            //     0,
            //     this.state.recipe,
            //     this.handleAddFavorite,
            //     this.handleRemoveFavorite
            // );
            if (!this.state.inFavorite) {
                curRecipe = (
                    <RecipeDetail
                        recipeInfo={this.state.recipe}
                        clickedFunction={this.handleAddFavorite}
                        favoriteChecked={this.state.inFavorite}
                    />
                );
            } else {
                curRecipe = (
                    <RecipeDetail
                        recipeInfo={this.state.recipe}
                        clickedFunction={this.handleRemoveFavorite}
                        favoriteChecked={this.state.inFavorite}
                    />
                );
            }
        }
        return (
            <Aux>
                <div className={classes.flex_container}>{curRecipe}</div>
            </Aux>
        );
    }
}

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
// export default Recipe;
