import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

import classes from "./Ingredient.module.css";

class Ingredient extends Component {
    state = {
        success: false,
        ingredient: {},
        // ingredient_id: "",
        // ingredient_name: "",
        // image_url: "",
        // recipe: [],
        error: "",
        loading: true,
    };

    componentDidMount() {
        const { ingredient_id } = this.props.match.params;
        console.log(ingredient_id);

        let url = "http://3.12.253.9:3000/ingredient/";

        axios.get(`${url}${ingredient_id}`).then((res) => {
            if (res.data.result.success) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        ingredient: res.data.result,

                        error: "",
                        loading: false,
                    };
                });
            }
            console.log(this.state);
        });
    }

    handleAddFavorite = (e) => {
        e.preventDefault();
        console.log("check add value");
        console.log(e.target.value);
        this.props.onFavoriteAdded(e.target.value, this.props.token_id);
    };

    handleRemoveFavorite = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.props.onFavoriteRemoved(e.target.value, this.props.token_id);
    };

    render() {
        let curIngredient = <Spinner />;
        if (!this.state.loading) {
            curIngredient = ingredient_info(
                0,
                this.state.ingredient,
                this.handleAddFavorite,
                this.handleRemoveFavorite
            );
        }
        return <Aux>{curIngredient}</Aux>;
    }
}

function ingredient_info(key, ingredient_data, addFun, removeFun) {
    console.log(ingredient_data);
    const recipe_infos = ingredient_data.recipes.map((recipe) => {
        return recipe_info(recipe.recipe_name, recipe);
    });
    return (
        <div key={key}>
            <table>
                <tbody>
                    <tr>
                        <th>{ingredient_data.ingredient_id}</th>
                        <th>
                            <img
                                src={ingredient_data.image_url}
                                className={classes.img}
                                alt="lala"
                            />
                        </th>
                        <th>{ingredient_data.ingredient_name}</th>
                        <th>{recipe_infos}</th>
                        {/* <th>
                            <button
                                type="submit"
                                onClick={addFun}
                                value={recipe_data.recipe_id}
                            >
                                AddFav
                            </button>
                        </th>
                        <th>
                            <button
                                type="submit"
                                onClick={removeFun}
                                value={recipe_data.recipe_id}
                            >
                                RemoveFav
                            </button>
                        </th> */}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function recipe_info(key, recipe) {
    return (
        <div key={key}>
            <table>
                <tbody>
                    <tr>
                        {/* <th>{ingredient.id}</th> */}
                        <th>{recipe.recipe_name}</th>
                        {/* <th>{ingredient.image_url}</th> */}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        favorite_recipe_id: state.favoriteReducer.favorite_recipe_id,
        token_id: state.authReducer.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFavoriteAdded: (recipe_id, token) =>
            dispatch(actions.addFavoriteCheck(recipe_id, token)),
        onFavoriteRemoved: (recipe_id, token) =>
            dispatch(actions.removeFavoriteCheck(recipe_id, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);
// export default Recipe;
