import React, { Component } from "react";
// import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";

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

    render() {
        let curRecipe = recipe_info(0, this.state.recipe);
        return <Aux>{curRecipe}</Aux>;
    }
}

function recipe_info(key, recipe_data) {
    let ingredients_info = recipe_data.ingredients.map((ingredient) => {
        return ingredient_info(ingredient.name, ingredient);
    });
    return (
        <div key={key}>
            <table>
                <tr>
                    <th>{recipe_data.recipe_id}</th>
                    <th>
                        <img src={recipe_data.img_url} alt="lala" />
                    </th>
                    <th>{recipe_data.recipe_name}</th>
                    <th>{recipe_data.popularity}</th>
                    <th>{recipe_data.instructions}</th>
                    <td>{ingredients_info}</td>
                </tr>
            </table>
        </div>
    );
}

function ingredient_info(key, ingredient) {
    return (
        <div key={key}>
            <table>
                <tr>
                    <th>{ingredient.id}</th>
                    <th>{ingredient.name}</th>
                    <th>{ingredient.imageURL}</th>
                </tr>
            </table>
        </div>
    );
}

export default Recipe;
