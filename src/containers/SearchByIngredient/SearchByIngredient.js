import React, { Component } from "react";
// import { connect } from "react-redux";

import Aux from "../../hoc/Auxx/Auxx";

// import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
// import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import * as actions from "../../store/actions/index";
import axios from "axios";

class SearchIngredient extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredient_list: [""],
        matching_recipe: [
            {
                recipe_id: "",
                recipe_name: "",
                img_url: "",
            },
        ],
        currentQuery: "",
        success: false,
    };

    handleIngredientInputChange = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            return {
                ...prevState,
                currentQuery: e.target.value,
            };
        });
    };

    handleAddClick = (e) => {
        e.preventDefault();

        this.setState((prevState) => {
            return {
                ...prevState,
                ingredient_list: [
                    ...prevState.ingredient_list,
                    prevState.currentQuery,
                ],
            };
        });

        this.setState((prevState) => ({
            currentQuery: "",
        }));
    };

    handleSearchClick = (e) => {
        e.preventDefault();
        const cors = "https://cors-anywhere.herokuapp.com/";
        const url =
            "http://18.222.31.30/leftover_killer/get_matching_recipes.php";
        axios
            .post(`${cors}${url}`, { ingredients: this.state.ingredient_list })
            .then((res) => {
                // http://18.222.31.30/leftover_killer/get_recipes.php
                // http://localhost/leftoverkiller2/get_recipes.php
                console.log(res.data);
                const recipes = res.data.recipes;

                console.log(recipes);
                if (res.data.success) {
                    this.setState({
                        success: res.data.success,
                        matching_recipe: recipes,
                    });
                } else {
                    console.log("no return");
                }

                //
            });
    };

    render() {
        let cur_ingredient = this.state.ingredient_list.map((val, idx) => {
            return ingredient_display(idx, val);
        });

        let found_recipe = this.state.matching_recipe.map((val, idx) => {
            return recipe_display(idx, val);
        });

        return (
            <Aux>
                <input
                    type="text"
                    onChange={this.handleIngredientInputChange}
                    name="curSearch"
                    placeholder="Any Ingredient"
                    value={this.state.currentQuery}
                ></input>
                <button type="submit" onClick={this.handleAddClick}>
                    Add
                </button>
                <button type="submit" onClick={this.handleSearchClick}>
                    Search
                </button>
                <table>
                    <thead>Current Ingredient</thead>
                    <tbody>{cur_ingredient}</tbody>
                </table>
                <table>
                    <thead>Found Recipe</thead>
                    <tbody>{found_recipe}</tbody>
                </table>
            </Aux>
        );
    }
}

const ingredient_display = (key, ingredient_value) => {
    return <tr key={key}>{ingredient_value}</tr>;
};

const recipe_display = (key, recipe) => {
    return (
        <tr key={key}>
            {recipe.recipe_name} <img src={recipe.img_url} alt="lala" />
        </tr>
    );
};

// const mapStateToProps = (state) => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onIngredientAdded: (ingName) =>
//             dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) =>
//             dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) =>
//             dispatch(actions.setAuthRedirectPath(path)),
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withErrorHandler(BurgerBuilder, axios));
export default SearchIngredient;
