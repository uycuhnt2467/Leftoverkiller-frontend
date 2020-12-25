import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

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
        loading: false,
    };

    componentDidMount() {
        const { recipeId } = this.props.match.params;
        console.log(recipeId);

        let url = "http://3.12.253.9:3000/recipe/";

        axios.get(`${url}${recipeId}`).then((res) => {
            this.setState((prevState) => {
                return {
                    success: res.data.result.success,
                };
            });
            this.setState((prevState) => {
                return {
                    ...prevState,
                    recipe: res.data.result,
                    loading: true,
                };
            });
            console.log(res.data);
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
        let curRecipe = <Spinner />;
        if (this.state.loading) {
            curRecipe = recipe_info(
                0,
                this.state.recipe,
                this.handleAddFavorite,
                this.handleRemoveFavorite
            );
        }
        return <Aux>{curRecipe}</Aux>;
    }
}

function recipe_info(key, recipe_data, addFun, removeFun) {
    let ingredients_info = recipe_data.ingredients.map((ingredient) => {
        return ingredient_info(ingredient.ingredient_name, ingredient);
    });
    console.log("here222");
    console.log(recipe_data);
    console.log(recipe_data.recipe_name);
    return (
        <div key={key}>
            <table>
                <tbody>
                    <tr>
                        <th>{recipe_data.recipe_id}</th>
                        <th>
                            <img
                                src={recipe_data.image_url}
                                className={classes.img}
                                alt="lala"
                            />
                        </th>
                        <th>{recipe_data.recipe_name}</th>
                        <th>{recipe_data.instruction}</th>
                        <th>{ingredients_info}</th>
                        <th>
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
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function ingredient_info(key, ingredient) {
    return (
        <div key={key}>
            <table>
                <tbody>
                    <tr>
                        {/* <th>{ingredient.id}</th> */}
                        <th>{ingredient.ingredient_name}</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
// export default Recipe;
