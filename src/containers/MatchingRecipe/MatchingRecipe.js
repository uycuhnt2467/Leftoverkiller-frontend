import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import MatchingRecipeDisplay from "./MatchingRecipeDisplay/MatchingRecipeDisplay";
// import * as actions from "../../store/actions/index";

import classes from "./MatchingRecipe.module.css";

class MatchingRecipe extends Component {
    state = {
        success: false,
        recipes: [
            // recipe_id: "",
            // recipe_name: "",
            // popularity: 0,
            // instructions: "",
            // img_url: "",
            // ingredients: [],
        ],
        error: "",
        loading: true,
    };

    componentDidMount() {
        console.log("matching recipe: componentDidMount");
        console.log(this.props.ingredients);
        let ingredient = this.props.ingredients.map(
            (val) => val.ingredient_name
        );
        console.log(ingredient);
        const ingredientData = {
            ingredients: ingredient,
        };
        console.log(ingredientData);
        const url = "http://3.12.253.9:3000/search";
        axios.post(url, ingredientData).then((result) => {
            console.log(result.data.result);
            if (result.data.result.success) {
                this.setState({
                    recipes: result.data.result.recipes,
                    success: true,
                    loading: false,
                });
            } else {
                this.setState({
                    recipes: [],
                    success: false,
                    loading: false,
                });
            }
        });
    }

    render() {
        let curRecipe = <Spinner />;
        if (!this.state.loading) {
            if (this.state.recipes.length > 0) {
                curRecipe = this.state.recipes.map((val) =>
                    MatchingRecipeDisplay(val)
                );
            } else {
                curRecipe = <p>No matching recipe</p>;
            }
        }
        return (
            <Aux>
                {" "}
                <div className={classes.inputDiv}>
                    <h1 className={classes.title}>Matching Recipe</h1>
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
                <div className={classes.flex_container}>{curRecipe}</div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredientsReducer.ingredients,
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onFavoriteAdded: (recipe_id, token) =>
//             dispatch(actions.addFavoriteCheck(recipe_id, token)),
//         onFavoriteRemoved: (recipe_id, token) =>
//             dispatch(actions.removeFavoriteCheck(recipe_id, token)),
//     };
// };

export default connect(mapStateToProps, null)(MatchingRecipe);
// export default Recipe;
