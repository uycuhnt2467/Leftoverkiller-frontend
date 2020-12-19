import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import * as actions from "../../store/actions/index";

class Recipe extends Component {
    state = {
        success: false,
        recipe: {
            recipe_id: "",
            recipe_name: "",
            popularity: 0,
            instructions: "",
            img_url: "",
            ingredients: [],
        },
        error: "",
    };

    componentDidMount() {
        const { recipeId } = this.props.match.params;
        console.log(recipeId);
        const cors = "https://cors-anywhere.herokuapp.com/";
        const url =
            "http://18.222.31.30/leftover_killer/get_recipe_details.php";
        var bodyFormData = new FormData();
        bodyFormData.append("recipe_id", recipeId);
        axios.post(`${cors}${url}`, bodyFormData).then((res) => {
            this.setState((prevState) => {
                return {
                    success: res.data.success,
                };
            });
            this.setState((prevState) => {
                return {
                    ...prevState,
                    recipe: {
                        recipe_id: res.data.recipe_id,
                        recipe_name: res.data.recipe_name,
                        popularity: res.data.popularity,
                        instructions: res.data.instructions,
                        ingredients: res.data.ingredients,
                        img_url: res.data.img_url,
                    },
                };
            });
            console.log(res.data);
        });
    }

    handleAddFavorite = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.props.onFavoriteAdded(e.target.value);
    };

    handleRemoveFavorite = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.props.onFavoriteRemoved(e.target.value);
    };

    render() {
        let curRecipe = recipe_info(
            0,
            this.state.recipe,
            this.handleAddFavorite,
            this.handleRemoveFavorite
        );
        return <Aux>{curRecipe ? curRecipe : ""}</Aux>;
    }
}

function recipe_info(key, recipe_data, addFun, removeFun) {
    let ingredients_info = recipe_data.ingredients.map((ingredient) => {
        return ingredient_info(ingredient.name, ingredient);
    });
    return (
        <div key={key}>
            <table>
                <tbody>
                    <tr>
                        <th>{recipe_data.recipe_id}</th>
                        <th>
                            <img src={recipe_data.img_url} alt="lala" />
                        </th>
                        <th>{recipe_data.recipe_name}</th>
                        <th>{recipe_data.popularity}</th>
                        <th>{recipe_data.instructions}</th>
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
                        <th>{ingredient.id}</th>
                        <th>{ingredient.name}</th>
                        <th>{ingredient.imageURL}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        favorite_recipe_id: state.favoriteReducer.favorite_recipe_id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFavoriteAdded: (recipe_id) =>
            dispatch(actions.addFavorite(recipe_id)),
        onFavoriteRemoved: (recipe_id) =>
            dispatch(actions.removeFavorite(recipe_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
// export default Recipe;
